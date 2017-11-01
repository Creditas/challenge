class PaymentPhysical

	attr_reader :customer

	def initialize(customer:)
	@customer = customer
	end	

	def pay_physical()
		shipping = ShippingLabel.new(shipping_address: customer.email_address, from: "compras_online.com.br", to: customer.name, weight: 480,tribute:false)
		shipping.create_shipping
		puts "pagamento físico realizado com sucesso."
	end
end
