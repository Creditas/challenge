class OrderItemClosed
	attr_reader :customer_id, :order_id

	def initialize(customer_id, order_id)
		@customer_id = customer_id
		@order_id = order_id
	end
end