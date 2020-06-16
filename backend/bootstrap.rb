require_relative 'customer/address/address'
require_relative 'customer/customer'
require_relative 'customer/wallet/credit_card'
require_relative 'customer/wallet/payment_method'
require_relative 'product/product'
require_relative 'product/order'
require_relative 'product/product_type'
require_relative 'infra/pub_sub'
require_relative 'infra/topic'

require_relative './pub_sub_wiring'

# user signup at site
foolano = Customer.new("Foolano")

# user adds a payment method
payment_method = PaymentMethod.new(CreditCard.fetch_by_hashed('43567890'), Address.new('01525000'))
foolano.set_payment_method(payment_method)

order = Order.new(foolano)

# user adds products to his order (cart?)
shirt = Product.new('Camisa da Creditas', ProductTypes::PHYSICAL_ITEM)
order.add_product(shirt)

weekly_shirt_washing = Product.new('Servico Semanal de Lavagem de Camisas', ProductTypes::MEMBERSHIP)
order.add_product(weekly_shirt_washing)

book = Product.new('Livro Incrivel', ProductTypes::BOOK)
order.add_product(book)

pagode_album = Product.new('Album Digital do Raca Negra', ProductTypes::DIGITAL_MEDIA)
order.add_product(pagode_album)

# user select shipping address
order.ship_to(Address.new('01525001'))

# user chooses his payment method
order.pay_with(foolano.payment_method)

# closing order
order.close
