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
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^the payment \(for service\) is done$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^we must activate the subscription$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^notify the user via email$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^the payment is for ordinary book$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^the payment \(for book\) is done$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^we must generate the shipping label with a notification$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^the payment is for any "([^"]*)" media$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^we need to send the description of purchase by email to buyer$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^grant a discount voucher of \$(\d+) to the buyer$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end
