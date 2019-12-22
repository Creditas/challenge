load 'bootstrap.rb'

class PaymentProcessor

  def process_payment (payment)
    if not payment.paid?
      puts "Must receive payment before processing!"
    end

    customer = payment.order.customer
    payment.order.items.each do |item|
      item.product.send(customer, payment.invoice)
    end
  end

end

# Book Example (build new payments if you need to properly test it)
foolano = Customer.new "João"


book = Book.new(name: 'Awesome book')
order = Order.new(foolano)
order.add_product(book)


headphone = Physical.new(name: 'Awesome headphone')
order.add_product(headphone)

spotify = Membership.new(name: 'spotify membership')
order.add_product(spotify)

movie = Digital.new(name: 'Justice League')
order.add_product(movie)

payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment.pay

processor = PaymentProcessor.new
processor.process_payment(payment)