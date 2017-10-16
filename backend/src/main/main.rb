require_relative '../domain/_seedwork/domain_event_publisher'
require_relative '../domain/customers/customer'
require_relative '../domain/products/product'
require_relative '../domain/orders/order'
require_relative '../domain/orders/credit_card'
require_relative '../domain/shipping_handling/membership_item_shipping_handler'
require_relative '../domain/shipping_handling/physical_item_shipping_handler'
require_relative '../domain/shipping_handling/digital_item_shipping_handler'
require_relative '../domain/shipping_handling/book_item_shipping_handler'
require_relative '../infrastructure/membership_repository'
require_relative '../infrastructure/customer_repository'
require_relative '../infrastructure/order_repository'
require_relative '../infrastructure/mailer'
require_relative '../infrastructure/printer'
require_relative 'registry_based_domain_event_publisher'

# application bootstrap:
# registra os event handlers e configura o DomainEventPublisher da aplicação

customer_repo = CustomerRepository.new
order_repo = OrderRepository.new

event_handler_registry = { 
  membership_item_closed: [ MembershipItemShippingHandler.new(MembershipRepository.new, customer_repo, Mailer.new) ],
  physical_item_closed: [ PhysicalItemShippingHandler.new(order_repo, Printer.new) ],
  digital_item_closed: [ DigitalItemShippingHandler.new(order_repo, customer_repo, Mailer.new) ],
  book_item_closed: [ BookItemShippingHandler.new(order_repo, Printer.new) ]
}

default_event_publisher = RegistryBasedDomainEventPublisher.new(event_handler_registry)
DomainEventPublisher.current = default_event_publisher

# playground
foolano = Customer.new(1, 'Robson Castilho', 'falecom@robsoncastilho.com.br')
customer_repo.add(foolano)

order = Order.new(1, foolano)
order_repo.add(order)

membership = Product.new(name: 'Membership', type: :membership)
physical_item = Product.new(name: 'Metallica Live', type: :physical)
book = Product.new(name: 'It', type: :book)
digital_media = Product.new(name: 'Audioslave Live', type: :digital)

order.add_product(membership)
order.add_product(digital_media)
order.add_product(physical_item)
order.add_product(book)
order.add_payment(CreditCard.fetch_by_hashed("92833-133"))

order.pay