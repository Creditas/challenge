require_relative 'deliver.rb'
require_relative 'shippable.rb'

class BookProductDeliver < Deliver
  include Shippable

  def process
    self.shipping_label
  end

  def shipping_label
    label1 = super
    return label1 + ", item isento de impostos conforme disposto na Constituição Art. 150, VI, d"
  end
end
