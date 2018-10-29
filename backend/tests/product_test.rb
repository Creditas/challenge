require 'test/unit'
require_relative '../src/product'

class ProductTest < Test::Unit::TestCase
    
    def setup
        attributes = {
            :full_name => "Album: Sample Album (2005)",
            :artist => "Artist: Sample Artist"
        }
        @product = Product.new(name: "Sample Album", type: :digital, price: 10, attributes: attributes)
    end

    def test_can_create_product
        assert_instance_of(Product, @product)
    end

    def test_can_get_as_string
        expected = "Album: Sample Album (2005)\n"
        expected += "Artist: Sample Artist\n"
        expected += "Price: $ 10\n"
        expected += "--------------\n"
        assert_equal(expected, @product.to_s)
    end
end
