
module BankFacil
	class OrderItem
		attr_reader :order, :product
		attr_accessor :quantity

		def initialize(order, product, quantity)
			@order = order
			@product = product
			@quantity = quantity
		end

		def total
			@product.price * @quantity
		end

		def ship?
			@product.ship?
		end
	end
end