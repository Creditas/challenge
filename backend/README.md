# Desafio para Backend Software Engineer 

##Require the library:
```ruby
require './payment_flow'
```

##Usage:

Create the Customer
```ruby
customer = Customer.new('Gabriel Hamdan', 'ghamdan.eng@gmail.com', 'Rua Alvorada, 735')
```

Create the Products
```ruby
book = Product.new('Awesome book', :book, true)
digital = Product.new('Awesome digital', :digital)
```

The second argument could be any of the defined types. If it is a book and it is commom, specify a third argument as 'true'

Create an Order and add the products to it
```ruby
order = Order.new(customer)
order.add_product(book)
order.add_product(digital)
```

Create the payment object
```ruby
payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
```

Initialize the payment flow
```ruby
PaymentFlow.new(payment)
```

It will generate a flow for each added product on the order.

##To add more product types

* You'll need to add the a file to flows/types folder with the name of the type followed by "_type".
* Inside, define a module of the type "{TypeName}Type" camelized (ruby standard), inherited from Flows module.
* Then, define a method called "{type_name}" and inside of it, give the instructions needed for this specific kind of type.
