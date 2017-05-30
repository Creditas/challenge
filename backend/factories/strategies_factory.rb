class StrategiesFactory

  PRODUCT_TO_STRATEGY_MAP = { physical: PhysicalStrategy, book: BookStrategy,
    digital: DigitalStrategy, membership: MembershipStrategy }

  def self.get(order_item:, options: {})
    PRODUCT_TO_STRATEGY_MAP.fetch(order_item.product.type).new(order_item: order_item, options: options)
  end
end
