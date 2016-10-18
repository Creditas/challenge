
module BankFacil
	class Shipment
		attr_reader :order

		def initialize(order:)
			@order = order
		end

		def print_shipping_label
			# build message if there is any book in the order
			book_item = @order.items.any? { |order_item| order_item.product.is_a? Book }
			message = "Item isento de impostos conforme disposto na Constituição Art. 150, VI, d." if book_item
			# retrieve items to be shipped
			shipping_items = @order.items.select { |order_item| order_item.product.ship? }
			# Logic to render label ...
		end
	end
end