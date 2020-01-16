require_relative '../domain/customer'
require_relative '../domain/product'
require_relative '../domain/payment_method'
require_relative '../domain/order'
require_relative '../domain/invoice'
require_relative '../domain/carrier'
require_relative '../domain/distribution_hub'

require_relative '../infrastructure/email_provider'
require_relative '../infrastructure/printer_service'

require_relative '../infrastructure/address_repository'
require_relative '../infrastructure/membership_repository'
require_relative '../infrastructure/payment_methods_repository'
require_relative '../infrastructure/voucher_repository'

# IoC -- Keep scrolling --
# As inicializações acabam sendo mais verbosas por conta do IoC,
# entretanto o código se torna bem menos acoplado, honestamente não sei qual o ideal para ruby,
# mas java, go ou mesmo python esse é o default

email_provider = EmailProvider.new
printer = PrinterService.new

addresses = AddressRepository.new
memberships = MembershipRepository.new
vouchers = VoucherRepository.new
wallets = PaymentMethodRepository.new

# Product Distribution by category
book_carrier = BookCarrier.new(printer)
physical_carrier = PhysicalCarrier.new(printer)
digital_carrier = DigitalCarrier.new(email_provider, vouchers)
subscription_carrier = SubscriptionCarrier.new(email_provider, memberships)

distribution_hub = DistributionHub.new
distribution_hub.add_strategy(:book, book_carrier)
distribution_hub.add_strategy(:physical, physical_carrier)
distribution_hub.add_strategy(:digital_media, digital_carrier)
distribution_hub.add_strategy(:subscription, subscription_carrier)

# Create some Products
book_product = Product.new(1, 'Clojure for the brave and true', :book, 20.00)
physical_product = Product.new(2, 'Otamatone from Maywa Denki', :physical, 25.00)
digital_product = Product.new(3, 'Digital Art - Power Rangers Poster', :digital_media, 100.00)
subscription_product = Product.new(4, 'Spotifai - Subscription', :subscription, 7.00)

# Create a User
customer = Customer.new('foolano', 'foolano@github.io')

# Create a Order for a given user and add products
shipping_address = addresses.find_customer_addresses(customer).first
order = Order.new(customer, shipping_address)
order.add_product(book_product)
order.add_product(physical_product)
order.add_product(digital_product)
order.add_product(subscription_product)

# Create a invoice from a given order
billing_address = addresses.find_customer_addresses(customer).first
invoice = Invoice.new(order, billing_address)

# Pay the invoice (bill)
chosen_payment_method = wallets.find_customer_payment_methods(customer).first
chosen_payment_method.pay(invoice)


if invoice.paid?
  distribution_hub.expedite(order)
end
