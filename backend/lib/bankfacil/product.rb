
module BankFacil
	class Product
		attr_reader :name, :price, :description

		def initialize(name:, price:, description:)
			@name = name
			@price = price
			@description = description
		end

		def ship?
			true
		end

		def when_order_closed(order)
		end
	end
end

# Load all products
Dir[File.dirname(__FILE__) + '/product/*.rb'].each { |file| require file }