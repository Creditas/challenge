Given("that there is a customer called {string}") do |name|
  @customer = Customer.new(name: name)
end

Given("he wants to place an order") do
  @order = Order.new(@customer, address: Address.new(zipcode: '45678-979'))
end

Given("that he ordered a physical book with the price of {float}") do |price|
  @product = Catalog.build_physical_book(name: "Dom Quixote")
  @order.add_item(@product, price)
end

Given("that he ordered a physical {string} with the price of {float}") do |item, price|
  @product = Catalog.build_physical_product(name: item)
  @order.add_item(@product, price)
end

Given("that he ordered a digital {string} with the price of {float}") do |item, price|
  @product = Catalog.build_digital_product(name: item)
  @order.add_item(@product, price)
end

When("the order is paid with a credit card") do
  @payment = Payment.new(order: @order, payment_method: CreditCard.fetch_by_hashed("8432094380243-43293240432"))
  @payment.pay
end

Then("it generates an invoice with the order information") do
  expect(@payment.invoice).not_to be_nil
  expect(@payment.invoice.shipping_address).to eq(@order.address)
  expect(@payment.invoice.billing_address).to eq(@order.address)
end

Then("it generates a shipping label with the customer address and a tax free notification") do
  expect(@order.shipping_labels.first).to eq("Kevin\nCEP: 45678-979\nItem isento de impostos conforme disposto na Constituição Art. 150, VI, d.")
end

Then("it generates a shipping label with the customer address") do
  expect(@order.shipping_labels.first).to eq("Kevin\nCEP: 45678-979")
end

Then("it sends to the user an e-mail notification with the order information") do
  expect(@customer.email_notifications.count).to eq(1)
  @email_notification = @customer.email_notifications.first
  expect(@email_notification.to_address).to eq(@order.email_address)
end

Then("it doesn't generate a shipping label") do
  expect(@order.shipping_labels.count).to eq(0)
end

Then("it gives a discount voucher of {int} to the user to use in a new purchase") do |value|
  expect(@customer.vouchers.count).to eq(1)
  @voucher = @customer.vouchers.first
  expect(@voucher.value).to eq(10)
end
