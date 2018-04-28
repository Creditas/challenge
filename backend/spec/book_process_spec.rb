require File.join(File.dirname(__FILE__), "/spec_helper")

RSpec.describe 'Processing book payment' do
  before :each do
    @payment = PaymentsCreate.book
    @process_payment = ProcessPayments::Providers::BookProcess.new(@payment)

  end
  context "when the process method is called" do
    it "and shipping label is created" do
      expect(Helpers::ShippingLabel.instance).to receive(:generate)
      @process_payment.execute
    end

    it "and the notification is sent" do
      expect(@process_payment.notification).to receive(:send)
      @process_payment.execute
    end
  end
end
