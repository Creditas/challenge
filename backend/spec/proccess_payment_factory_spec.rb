require File.join(File.dirname(__FILE__), "/spec_helper")



RSpec.describe 'Process Payment Factory' do

  context "when the create method is called" do
    it "and the book instance must be created" do
      payment = PaymentsCreate.book

      instance = ProcessPayments::Factory.create(payment)
      expect(instance).to be_a(ProcessPayments::Providers::BookProcess)
    end

    it "and the physical instance must be created" do
      payment = PaymentsCreate.physical

      instance = ProcessPayments::Factory.create(payment)
      expect(instance).to be_a(ProcessPayments::Providers::PhysicalProcess)
    end

    it "and the digital instance must be created" do
      payment = PaymentsCreate.digital

      instance = ProcessPayments::Factory.create(payment)
      expect(instance).to be_a(ProcessPayments::Providers::DigitalProcess)
    end

    it "and the membership instance must be created" do
      payment = PaymentsCreate.membership

      instance = ProcessPayments::Factory.create(payment)
      expect(instance).to be_a(ProcessPayments::Providers::MembershipProcess)
    end
  end
end
