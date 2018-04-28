require File.join(File.dirname(__FILE__), "/spec_helper")

RSpec.describe 'Processing membership payment' do
  before :each do
    @payment = PaymentsCreate.membership
    @process_payment = ProcessPayments::Providers::MembershipProcess.new(@payment)

  end
  context "when the process method is called" do

    it "and the customer class called the to_member method" do
      expect(@payment.order.customer).to receive(:to_member)
      @process_payment.execute
    end


    it "and the client has become membership" do
      @process_payment.execute
      expect(@payment.order.customer.membership).not_to be_nil
      expect(@payment.order.customer.membership_at).not_to be_nil
    end

    it "and the notification is sent" do
      expect(@process_payment.notification).to receive(:send)
      @process_payment.execute
    end
  end
end
