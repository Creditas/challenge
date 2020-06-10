
#TestClass
require File.expand_path('lib\compra_online\compra_online.rb')

# Book Example (build new payments if you need to properly test it)
voucher = Voucher.new(desconto: 10)



foolano = Customer.new(name:'Dario Canuto',address:'estrada das lagrimas 247', celphone:'959455268', emailAddress:'dario_canuto@hotmail.com',signature:false)


book = Product.new(name: 'Awesome book', type: :book)
book_order = Order.new(foolano)
book_order.add_product(book)

payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_book.pay_physical()
payment_book.pay_book()
payment_book.pay_digital()
payment_book.pay_signature()
#p payment_book.paid? # < true

# now, how to deal with shipping rules then?