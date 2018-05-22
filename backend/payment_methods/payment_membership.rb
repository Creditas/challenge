class PaymentMembership < Payment

	def send_email
		super
		active_signature
	end

	def active_signature
		p "Assinatura Ativada."
	end

end