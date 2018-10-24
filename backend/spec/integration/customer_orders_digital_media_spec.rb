require "spec_helper"

RSpec.describe "Customer orders digital media" do
  it "Order is correctly processed" do
    current_time = Time.new(2018, 10, 23, 23, 30)
    address = Address.new(zipcode: "65432-987")
    customer = Customer
               .new(name: "Jimmy",
                    email: "jimmy@jimmy.org",
                    address: address)

    movie = Product::DigitalMedia.new(name: "Fight Club", price: 5.99)
    order = Order.new(customer)
    order.add_product(movie)

    payment = Payment.new(
      order: order,
      payment_method: CreditCard.fetch_by_hashed("098765432-12345678")
    )
    payment.pay(current_time)

    # Product expectations
    expect(movie.type).to eq(:digital)

    # Order expectation
    expect(order.total_amount).to eq(movie.price)
    expect(order.closed_at).to eq(payment.paid_at)

    # Order item expectations
    order_item = order.items.first
    expect(order.items.count).to eq(1)
    expect(order_item).to be_instance_of(OrderItem::DigitalMedia)
    expect(order_item.product).to be(movie)
    expect(order_item.quantity).to eq(1)
    expect(order_item.order).to be(order)
    expect(order_item.processed?).to be true

    # Digital media expectations
    expect(customer.digital_medias.count).to eq(1)
    expect(customer.digital_medias.first).to be(movie)

    # Voucher expectations
    voucher = customer.vouchers.first
    expect(customer.vouchers.count).to eq(1)
    expect(voucher.code).not_to be_empty
    expect(voucher.value).to eq(10.0)
    expect(voucher.payment).to be(payment)

    # Email notification expectactions
    notification = customer.notifications.first
    expect(customer.notifications.count).to eq(1)
    expect(notification.customer).to be(customer)
    expect(notification.recipient).to eq(customer.email)
    expect(notification.subject).to match(/compra.+sucesso/i)
    expect(notification.subject).to match(/#{movie.name}/)
    expect(notification.body).to match(/compra.+sucesso/)
    expect(notification.body).to match(/#{movie.name}/)
    expect(notification.body).to match(/voucher.+valor.+#{voucher.value}/i)
    expect(notification.body).to match(/codigo.+voucher.+#{voucher.code}/i)

    # Payment expectations
    expect(payment.order).to be(order)
    expect(payment.amount).to eq(movie.price)
    expect(payment.authorization_number).to eq(Time.now.to_i)
    expect(payment.invoice).not_to be nil
    expect(payment.paid_at).to eq(current_time)
    expect(payment.paid?).to be true

    # Invoice expectations
    expect(payment.invoice.billing_address).to be(customer.address)
    expect(payment.invoice.shipping_address).to be(customer.address)
    expect(payment.invoice.order).to be(order)
  end
end

