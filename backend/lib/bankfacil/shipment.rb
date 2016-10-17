
module BankFacil
	class Shipment
		attr_reader :order

		def initialize(order)
			@order = order
		end

		def shipping_items
			@order.items.select(&:ship?)
		end

		private

		def print_shipping_label
			# logic to render and print shipping label
		end
	end
end