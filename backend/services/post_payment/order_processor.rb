require_relative 'item_processors/book_item_processor'
require_relative 'item_processors/digital_item_processor'
require_relative 'item_processors/membership_item_processor'
require_relative 'item_processors/physical_item_processor'

module PostPayment

  ITEM_PROCESSORS = {
    book: BookItemProcessor,
    digital: DigitalItemProcessor,
    physical: PhysicalItemProcessor,
    membership: MembershipItemProcessor
  }.freeze

  def self.item_processor(type)
    ITEM_PROCESSORS[type]
  end

  class OrderProcessor
    def initialize(invoice)
      @invoice = invoice
      @order = invoice.order
    end

    def perform
      @order.items.each do |item|
        PostPayment.item_processor(item.type).new(item: item, invoice: @invoice).perform
      end
    end
  end
end
