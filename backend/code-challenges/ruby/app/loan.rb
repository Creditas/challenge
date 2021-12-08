class Loan
  attr_reader :type

  def initialize(attributes = {})
    @type = attributes[:type]
  end

  def ==(o)
    o.class == self.class && o.type == @type
  end
end
