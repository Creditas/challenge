class PaymentSignature
	attr_reader :customer

	def initialize(customer:)
	@customer = customer
	end	

	def pay_signature()
		customer.signature = true
		email = Email.new(email_address: customer.email_address, subject: "Pagamento da assinatura no Compras Online ",
			text: "Olá obrigado pela assinatura", attachment: "termos_uso.pdf")
		email.send_to_email
		puts "assinatura paga com sucesso!"
	end

end
