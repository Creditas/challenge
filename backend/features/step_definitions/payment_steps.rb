Given(/^the payment is for a physical item$/) do
  product = Product.new(name: 'Awesome product', type: :physical)
  @product_order = Order.new(@foolano)
  @product_order.add_product(product)
end

When(/^the payment is done$/) do
  payment_product = Payment.new(
    order: @product_order,
    payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
  expect(@product_order.sent?).to be false
  expect(payment_product.paid?).to be false
  payment_product.pay
  expect(payment_product.paid?).to be true
end

Then(/^we must generate one shipping label to the shipping box$/) do
  expect(@product_order.items[0].ship).to be_a(ShippingLabel)
  expect(@product_order.sent?).to be true
  expect(@product_order.items[0].ship.print).to(
    eq(format('Shipping label to %s', @foolano.name)))
end

Given(/^the payment is for a service subscription$/) do
  membership = Product.new(name: 'Awesome Service', type: :membership)
  @subscription_order = Order.new(@foolano)
  @subscription_order.add_product(membership)
end

When(/^the payment \(for service\) is done$/) do
  payment_service = Payment.new(
    order: @subscription_order,
    payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
  payment_service.pay
end

Then(/^we must activate the subscription$/) do
  subscription = @subscription_order.items[0]
  membership = subscription.ship.fetch(:membership)
  expect(membership.is_active?).to be true
end

Then(/^notify the user via email$/) do
  subscription = @subscription_order.items[0]
  email = subscription.ship.fetch(:email)
  expect(email.print).to eq(format('Email sent to %s', @foolano.email))
end

Given(/^the payment is for ordinary book$/) do
  book = Product.new(name: 'Another awesome book', type: :book)
  @book_order = Order.new(@foolano)
  @book_order.add_product(book)
end

When(/^the payment \(for book\) is done$/) do
  book_payment = Payment.new(
    order: @book_order,
    payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
  book_payment.pay
end

Then(/^we must generate the shipping label with a notification$/) do
  book_item = @book_order.items[0]
  book = book_item.ship
  expect(book.print).to eq(format('Shipping label to %s', @foolano.name))
end

Given(/^the payment is for any "([^"]*)" media$/) do |arg|
  digital = Product.new(name: 'Awesome Music', type: arg.to_sym)
  @digital_order = Order.new(@foolano)
  @digital_order.add_product(digital)
end

Then(/^we need to send the description of purchase by email to buyer$/) do
  payment = Payment.new(
    order: @digital_order,
    payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
  payment.pay
  digital_item = @digital_order.items[0]
  email = digital_item.ship.fetch(:email)
  expect(email.print).to eq(format('Email sent to %s', @foolano.email))
end

Then(/^grant a discount voucher of \$(\d+) to the buyer$/) do |value|
  digital_item = @digital_order.items[0]
  voucher = digital_item.ship.fetch(:voucher)
  expect(voucher.value).to eq(value.to_i)
end
