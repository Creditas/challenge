require_relative 'delivery/membership_delivery'
require_relative 'delivery/digital_media_delivery'
require_relative 'delivery/book_delivery'
require_relative 'delivery/physical_item_delivery'
require_relative 'communication/email_sender'
require_relative 'voucher/voucher_processor'
require_relative 'product/invoice_processor'
require_relative 'product/order_processor'

# Wiring the subscribers to topics
PubSub.instance.subscribe(Topics::ORDER_CLOSED, OrderProcessor.new)

PubSub.instance.subscribe(Topics::PAID_INVOICE, InvoiceProcessor.new)

PubSub.instance.subscribe(Topics::PRODUCT_SOLD, MembershipDelivery.new, ProductTypes::MEMBERSHIP)
PubSub.instance.subscribe(Topics::PRODUCT_SOLD, DigitalMediaDelivery.new, ProductTypes::DIGITAL_MEDIA)
PubSub.instance.subscribe(Topics::PRODUCT_SOLD, BookDelivery.new, ProductTypes::BOOK)
PubSub.instance.subscribe(Topics::PRODUCT_SOLD, PhysicalItemDelivery.new, ProductTypes::PHYSICAL_ITEM)

PubSub.instance.subscribe(Topics::MEMBERSHIP_ACTIVATED, EmailSender.new)
PubSub.instance.subscribe(Topics::DIGITAL_MEDIA_ACQUIRED, EmailSender.new)
PubSub.instance.subscribe(Topics::DIGITAL_MEDIA_ACQUIRED, VoucherProcessor.new)
