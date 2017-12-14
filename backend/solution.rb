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

book = Book.new(name: 'Awesome book')