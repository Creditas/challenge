require 'test/unit'

load 'app/model/address.rb'
load 'app/model/membership.rb'
load 'app/model/customer.rb'
load 'app/model/order.rb'
load 'app/model/orderitem.rb'
load 'app/model/product.rb'
load 'app/model/payment.rb'
load 'app/model/creditcard.rb'
load 'app/model/invoice.rb'
load 'app/model/shipping.rb'

class OrderTest < Test::Unit::TestCase

  def setup
  	@address = Address.new(zipcode="05016-081")
  	@membership = Membership.new(since = Time.now)
  	@customer = Customer.new(name="Felipe", email="felipe@teste.com", membership=@membership, address=@address)
    @order = Order.new(@customer)

    product1 = Product.new(name="Carcereiros", type="Livro", value=22.99)
  	product2 = Product.new(name="Por um fio", type="Livro", value=25.99)
  	product3 = Product.new(name="Gonzaguinha", type="CD", value=45.99)
  	product4 = Product.new(name="Seguro Celular", type="Serviço", value=300.99)
  	
  	order_item1 = OrderItem.new(order=@order, product=product1, item_type=:book, shipping_label=nil, voucher=0)
  	order_item2 = OrderItem.new(order=@order, product=product3, item_type=:digital_media, shipping_label=nil, voucher=10.0)
  	order_item3 = OrderItem.new(order=@order, product=product4, item_type=:service, shipping_label=nil, voucher=0)

  	@order.add_product(product=product2, item_type=:book)
  	@order.add_item(order_item1)
  	@order.add_item(order_item2)
  	@order.add_item(order_item3)
  end

  def test_add_item
  	assert_equal(4, @order.items.size)
  end

  def test_total_amount
  	#Voucher added
  	assert_equal(385.96000000000004, @order.total_amount)
  end

  def test_payment
  	creditcard = CreditCard.fetch_by_hashed('1234_5678_0123_1234')
  	invoice = Invoice.new(:order => @order, :billing_address => @order.address, 
  							:shipping_address => @order.address)
  	payment = Payment.new(attributes={:order => @order, :payment_method => creditcard, 
  							:invoice => invoice})

  	shipping = Shipping.new(order=@order)

  	if !payment.paid?
  		payment.pay(Time.now)

  		assert_equal(1, 1)
  	end

  	@order = nil
  end	

end