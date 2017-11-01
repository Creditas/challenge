class PaymentBook
attr_reader :customer

	def initialize(customer:)
	@customer = customer
	end	

	def pay_book()
		shipping = ShippingLabel.new(shipping_address: customer.email_address, from: "compras_online.com.br", to: customer.name, weight: 480,tribute:true)
		shipping.create_shipping
		puts "livro pago com sucesso"
	end
end

