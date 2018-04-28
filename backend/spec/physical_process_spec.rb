require File.join(File.dirname(__FILE__), "/spec_helper")

RSpec.describe 'Processing physical payment' do
  before :each do
    @payment = PaymentsCreate.physical
    @process_payment = ProcessPayments::Providers::PhysicalProcess.new(@payment)

  end
  context "when the process method is called" do
    it "and shipping label is created" do
      expect(Helpers::ShippingLabel.instance).to receive(:generate)
      @process_payment.execute
    end

    it "and the notification is not called" do
      expect(@process_payment.notification).not_to receive(:send)
      @process_payment.execute
    end
  end
end
