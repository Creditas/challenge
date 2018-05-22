class PaymentDigital < Payment

	def send_email
		super
    	vaucher()
  	end

  	def vaucher (discount = 10)
  		p "Concedido ao cliente um vauche com desconto de R$ #{discount}."
  	end

end

