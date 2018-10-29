require_relative './physical_shipping'

class BookShipping < PhysicalShipping
  def label_observations
    'Item isento de impostos conforme disposto na Constituição Art. 150, VI, d.'
  end
end
