class Product
  # use type to distinguish each kind of product: physical, book, digital, membership, etc.
  attr_reader :name, :type, :shipping_label, :notification

  def initialize(name:, type:)
    @name, @type = name, type
    @shipping_label = false
  end

  def generate_shipping_label()
      if @type == :physical
          @shipping_label = true
      end
  end

  def generate_shipping_label_with_notification()
      if @type == :book
          @shipping_label = true
          @notification =  "This item is free from charges according to Constituição Art. 150, VI, d."
      end
  end

  def shipping_label?()
      @shipping_label
  end
end
