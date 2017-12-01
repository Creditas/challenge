require_relative 'customer/address/address'
require_relative 'customer/customer'
require_relative 'customer/wallet/credit_card'
require_relative 'customer/wallet/payment_method'
require_relative 'product/order_processor'
require_relative 'product/product'
require_relative 'product/product_type'
require_relative 'infra/pub_sub'
require_relative 'infra/topic'

require_relative './pub_sub_wiring'

# user signup at site
foolano = Customer.new("Foolano")

# user adds a payment method
payment_method = PaymentMethod.new(CreditCard.fetch_by_hashed('43567890'), Address.new('01525000'))
foolano.set_payment_method(payment_method)

# user adds products to his order (cart?)
shirt = Product.new('Camisa da Creditas', ProductTypes::PHYSICAL_ITEM)
foolano.add_product_to_order(shirt)

weekly_shirt_washing = Product.new('Servico Semanal de Lavagem de Camisas', ProductTypes::MEMBERSHIP)
foolano.add_product_to_order(weekly_shirt_washing)

book = Product.new('Livro Incrivel', ProductTypes::BOOK)
foolano.add_product_to_order(book)

pagode_album = Product.new('Album Digital do Raca Negra', ProductTypes::DIGITAL_MEDIA)
foolano.add_product_to_order(pagode_album)

# user select shipping address
foolano.select_shipping_address(Address.new('01525001'))

# user confirms payment of order
foolano.pay_active_order
