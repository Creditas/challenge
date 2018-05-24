require 'bootstrap'

describe VoucherHandler do
  it 'inicializar' do
    customer = Customer.new('Paulo')
    expect(customer.vouchers).to be_empty
  end

  it 'adicionar' do
    customer = Customer.new('Paulo')
    customer.vouchers.add(Voucher.new(10))
    customer.vouchers.add(Voucher.new(20))
    expect(customer.vouchers.amount).to eq(2)
  end

  it 'usar' do
    customer = Customer.new('Paulo')
    customer.vouchers.add(Voucher.new(10))
    expect(customer.vouchers[0].value).to eq(10)
    customer.vouchers.use(0)
    expect(customer.vouchers.amount).to eq(0)
  end
end