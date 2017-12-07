require_relative '../../customer/customer'
require_relative '../../voucher/voucher'
require_relative '../../product/product'
require_relative '../../product/order'
require_relative '../../customer/wallet/payment_method'
require_relative '../../customer/wallet/credit_card'
require_relative '../../customer/address/address'

describe Customer do
  
  it 'should have a voucher when one is added' do
    foo = Customer.new('Foolano')
    voucher = Voucher.new
    foo.add_voucher(voucher)
    expect(foo.vouchers).to include(voucher)
  end

  it 'should have two voucher when two are added' do
    foo = Customer.new('Foolano')
    voucher1 = Voucher.new
    voucher2 = Voucher.new
    foo.add_voucher(voucher1)
    foo.add_voucher(voucher2)
    expect(foo.vouchers).to include(voucher1)
    expect(foo.vouchers).to include(voucher2)
  end

  it 'should have no vouchers when none are added' do
    foo = Customer.new('Foolano')
    expect(foo.vouchers.size).to eq(0)
  end

  it 'should have one payment method when one is setted' do
    foo = Customer.new('Foolano')
    payment_method = PaymentMethod.new(CreditCard.fetch_by_hashed('43567890'), Address.new('01525000'))
    foo.set_payment_method(payment_method)
    expect(foo.payment_method).to eq(payment_method)
  end

end
