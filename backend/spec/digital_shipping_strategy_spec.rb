require_relative "../bootstrap.rb"

RSpec.describe "Invoking DigitalShippingStrategy methods" do
  before :each do
    @foolano = Customer.new
    @order = Order.new(@foolano)
    @digital = DigitalShippingStrategy.new
  end

  it "should send a e-mail for a digital order on shipping" do
    expect(@digital).to receive(:send_mail)
    @digital.shipping(@order)
  end

  it "should generate a voucher to order customer on shipping" do
    expect(@digital).to receive(:generate_voucher)
    @digital.shipping(@order)
  end

  it "should create a voucher valued in 10.00 to customer" do
    @digital.send(:generate_voucher, @order.customer)
    expect(@foolano.vouchers).not_to be_empty
    expect(@foolano.vouchers.last.value).to eq(10.0)
  end

end
