require_relative './utilities/assert'
require_relative './utilities/common'
require_relative '../initialization'
require_relative './unit/physical_strategy_test'
require_relative './unit/book_strategy_test'
require_relative './unit/strategies_factory_test'

StrategiesFactoryTest.new.run
PhysicalStrategyTest.new.run
BookStrategyTest.new.run

print "\n"
