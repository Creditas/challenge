Given("that there is a customer called {string}") do |name|
  @customer = Customer.new(name: name)
end

Given("that he ordered a {string} with the price of {float}") do |item, price|
  @order = Order.new(@customer, address: Address.new(zipcode: '45678-979'))
  @product = Catalog.build_physical_product(name: item, type: item)
  @order.add_item(@product, price)
end

When("the order is paid with a credit card") do
  @payment = Payment.new(order: @order, payment_method: CreditCard.fetch_by_hashed("8432094380243-43293240432"))
  @payment.pay
end

Then("it should generate an invoice with the order information") do
  expect(@payment.invoice).not_to be_nil
  expect(@payment.invoice.shipping_address).to eq(@order.address)
  expect(@payment.invoice.billing_address).to eq(@order.address)
end

Then("it should generate a shipping label with the customer address and a tax free notification") do
  expect(@order.shipping_label).to eq("Kevin\nCEP: 45678-979\nItem isento de impostos conforme disposto na Constituição Art. 150, VI, d.")
end

Then("it should generate a shipping label with the customer address") do
  expect(@order.shipping_label).to eq("Kevin\nCEP: 45678-979")
end
