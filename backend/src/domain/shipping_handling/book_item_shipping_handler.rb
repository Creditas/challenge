class BookItemShippingHandler
	NOTIFICATION_MSG = "Item isento de impostos conforme disposto na Constituição Art. 150, VI, d."

	def initialize(order_repository, printer)
		@order_repository = order_repository
		@printer = printer
	end

	def handle(order_item_closed)
		order = @order_repository.get_by(order_item_closed.order_id)
		shipping_label = ShippingLabel.new(order.customer.name, order.invoice.shipping_address, NOTIFICATION_MSG)
		@printer.print(shipping_label)
	end
end