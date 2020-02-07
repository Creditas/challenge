require_relative "../bootstrap.rb"

RSpec.describe "Invoking MembershipShippingStrategy methods" do
  before :each do
    @foolano = Customer.new
    @order = Order.new(@foolano)
    @membership = MembershipShippingStrategy.new
  end

  it "should send a e-mail to membership order shipping" do
    expect(@membership).to receive(:send_mail)
    @membership.shipping(@order)
  end

  it "should activate a membership for a memebership order on shipping" do
    expect(@membership).to receive(:activate_membership)
    @membership.shipping(@order)
  end

end
