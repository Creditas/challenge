require_relative '../../product/order'

describe Order do
  
  it 'should have no products when none are added' do
    customer = instance_double('customer')
    order = Order.new(customer)
    expect(order.products.size).to eq(0)
  end

  it 'should have one product when one is added' do
    customer = instance_double('customer')
    product = instance_double('product')
    order = Order.new(customer)
    order.add_product(product)
    expect(order.products.size).to eq(1)
  end

  it 'total amount should equals sum of all products when there are products' do 
    customer = instance_double('customer')
    product1 = instance_double('product1', :total => 10)
    product2 = instance_double('product2', :total => 10)
    order = Order.new(customer)
    order.add_product(product1)
    order.add_product(product2)
    expect(order.total_amount).to eq(20)
  end

end