Dir[File.expand_path "app/model/**/*.rb"].each{|f| require_relative(f)}

# Book Example (build new payments if you need to properly test it)
foolano = Customer.new(name:'Sugamele', email:'foo@bar.com.br')

book = CommonBook.new(name: 'Awesome book')
movie = DigitalProduct.new(name: 'Awesome movie')
membership = Membership.new(name: 'Awesome membership')
physical = PhysicalProduct.new(name: 'Awesome pysical product')

order = Order.new(foolano)
order.add_product(book)
order.add_product(movie)
order.add_product(membership)
order.add_product(physical)

payment_book = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_book.pay
p payment_book.paid? # < true
p payment_book.order.items.first.product.type

# now, how to deal with shipping rules then?