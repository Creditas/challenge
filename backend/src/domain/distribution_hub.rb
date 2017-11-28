class DistributionHub
  def initialize(strategies={})

    @strategies = strategies
  end

  def add_strategy(category, strategy)
    @strategies[category] = strategy
  end

  def expedite(order)
    order
        .items
        .each {|item| @strategies[item.product.category].dispatch(item)}
  end
end