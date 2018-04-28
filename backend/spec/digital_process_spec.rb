require File.join(File.dirname(__FILE__), "/spec_helper")

RSpec.describe 'Processing digital payment' do
  before :each do
    @payment = PaymentsCreate.digital
    @process_payment = ProcessPayments::Providers::DigitalProcess.new(@payment)

  end
  context "when the process method is called" do

    it "and the notification is sent" do
      expect(@process_payment.notification).to receive(:send)
      @process_payment.execute
    end

    it "and the voucher is generated" do
      expect(Helpers::Voucher.instance).to receive(:create) { { code: '#VOUCHER'} }
      @process_payment.execute
    end

    it "and email has voucher created" do
      expect(Helpers::Voucher.instance).to receive(:create) { { code: '#VOUCHER'} }
      result = @process_payment.execute
      expect(result).to include("#VOUCHER")
    end

    it "and the voucher is added to the customer" do
      @process_payment.execute
      expect(@payment.order.customer.vouchers.length).to eq(1)
    end
  end
end
