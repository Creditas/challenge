require File.join(File.dirname(__FILE__), "/spec_helper")



RSpec.describe 'Template Builder Factory' do

  context "when the create method is called" do
    it "and the book template must be created" do
      payment = PaymentsCreate.book

      instance = Notifications::TemplateBuilder::Factory.create(payment)
      expect(instance).to be_a(Notifications::TemplateBuilder::Templates::BookTemplate)
    end


    it "and the digital template must be created" do
      payment = PaymentsCreate.digital


      instance = Notifications::TemplateBuilder::Factory.create(payment)
      expect(instance).to be_a(Notifications::TemplateBuilder::Templates::DigitalTemplate)
    end

    it "and the book template must be created" do
      payment = PaymentsCreate.membership

      instance = Notifications::TemplateBuilder::Factory.create(payment)
      expect(instance).to be_a(Notifications::TemplateBuilder::Templates::MembershipTemplate)
    end
  end
end
