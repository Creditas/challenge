require_relative './bootstrap'

# create fictional customer
customer = Customer.new("Joe", "0123456", "01-01-1990")
# create products container
products = Hash.new
# populate products hash
products[:physical] = Physical.new(name: 'Macbook', price: 5000)
products[:book] = Book.new(name: 'Learning Ruby', price: 50)
products[:digital] = Digital.new(name: 'Some Movie', price: 30)
products[:membership] = Membership.new(name: 'A Newspaper', price: 80)

# make one order, payment, and processing for each item in hash
# open order, add products, collect payment, verify, process
# order
order = Order.new(customer)
products.each do |k,v|
  order.add_product(v)
end

# payment
payment = Payment.new(order: order,
                      payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment.pay

# process order
if payment.paid?
  (payment.order).process
else
  puts "Order canceled due to unsucceful payment"
end
