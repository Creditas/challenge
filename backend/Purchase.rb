require_relative './Domain/Customer.rb'
require_relative './Domain/Product.rb'
require_relative './Domain/Order.rb'
require_relative './Payment.rb'
require_relative './CreditCard.rb'

class Purchase
    def initialize
        customer = Customer.new("João da Silva")
        product = Product.new(name: 'Awesome book', type: :service)
        book_order = Order.new(customer, product)      
        
        payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
        payment_book.pay
        p payment_book.paid? # < true
        p payment_book.order.items.first.product.type
    end
end