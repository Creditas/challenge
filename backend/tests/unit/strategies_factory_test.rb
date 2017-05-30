class StrategiesFactoryTest
  include Assert
  include Common

  def run
    assert StrategiesFactory.get(order_item:
      create(:order_item, { product: product(:physical) })).class == PhysicalStrategy

      assert StrategiesFactory.get(order_item:
        create(:order_item, { product: product(:book) })).class == BookStrategy

      assert StrategiesFactory.get(order_item:
        create(:order_item, { product: product(:membership) })).class == MembershipStrategy

      assert StrategiesFactory.get(order_item:
        create(:order_item, { product: product(:digital) })).class == DigitalStrategy
  end
end
