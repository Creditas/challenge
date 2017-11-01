class PaymentDigital
attr_reader :order

	def initialize(order:)
	@order = order
	end	

	def pay_digital()
		produto =  order.product
		email = Email.new(email_address: order.customer.email_address, subject: produto,
			text: "poduto comprado", attachment: "termos_uso.pdf")
		email.send_to_email
		voucher = Voucher.new(desconto:10)
		puts "midia digital paga com sucesso"
	end

end