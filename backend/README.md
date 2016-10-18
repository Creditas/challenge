### Exemplo

```Ruby
require_relative 'lib/bankfacil'

# Products
book_1 = BankFacil::Book.new(name: 'The Ruby Programming Language', price: 10.00, description: 'Learn the Ruby programming language')
book_2 = BankFacil::Book.new(name: 'Well Grounded Rubyist', price: 21.00, description: 'It combines deep knowledge with interactive exploration')

digital_1 = BankFacil::Digital.new(name: 'Digital Product 1', price: 20.50, description: 'Digital Product 1')


# Customer information
address = BankFacil::Address.new(zipcode: '04362-020')
henrique = BankFacil::Customer.new(name: 'Henrique Diomede', email: 'henrique.diomede@gmail.com')

# Order
voucher = BankFacil::Voucher.new(amount: 10.00, code: 'PROMOBANKFACIL', expiration_date: '18-10-2016', active: true)
order = BankFacil::Order.new(customer: henrique, address: address, voucher: voucher)
order.add_product(book_1, 2)
order.add_product(book_2, 1)
order.add_product(digital_1, 1)

# Payment
payment = BankFacil::Payment.new(order: order, payment_method: BankFacil::CreditCard.fetch_by_hashed('43567890-987654367'))
payment.pay

# Shipment
shipment = BankFacil::Shipment.new(order: order)
```

### Solução

- Para a lógica para gerar uma `shipping_label` e as ações específicas para cada produto após o pagamento, eu utilizei a
técnica de Duck Typing.
- As classes criadas para representar os produtos foram: `Digital`, `Physical`, `Book` e `Membership`
- A classe `Shipment` será responsável pela geração da `shipping_label` quando necessário para cada pedido
- OrderItem possui `quantity` para que possam ser incluídas várias unidades de um mesmo produto