require_relative 'modules/product.rb'
class PhysicalProduct
  include Product
  attr_reader :customer

  def initialize(name:)
  	super
    @type = ProductsType::PHYSICAL
  end

  def process customer
    Label.new.generate_for customer
  end
end