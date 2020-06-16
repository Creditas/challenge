class ProductTypes
  attr_accessor :type

  def initialize(type)
    @type = type
  end

  PHYSICAL_ITEM = new("Item Fisico")
  MEMBERSHIP = new("Assinatura de Servico")
  BOOK = new("Livro")
  DIGITAL_MEDIA = new("Midia Digital")

  class << self
    private :new
  end

end