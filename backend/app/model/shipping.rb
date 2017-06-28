class Shipping
	attr_reader :order

	def initialize(order)
		@order = order
		@order.shipping = self
	end

	def process
		if !@order.nil?
			p "Caro(a), #{order.customer.name}"
			p "Pedido finalizado com sucesso."
			p "A entrega do pedido será realizada no CEP: #{order.payment.invoice.shipping_address[0].zipcode[:zipcode]}."
			p "Produtos adquiridos:"
			
			@order.items.each { |item|
		      p "Item: #{item.product.name} - R$ #{item.product.value}"
		    }
		    p "Valor Total: 					 R$ #{order.total_amount}"
		end
	end
end