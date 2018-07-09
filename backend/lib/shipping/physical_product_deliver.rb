require_relative 'deliver.rb'
require_relative 'shippable.rb'

class PhysicalProductDeliver < Deliver
  include Shippable

  def process
    self.shipping_label
  end
end
