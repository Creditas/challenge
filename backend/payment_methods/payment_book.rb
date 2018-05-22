class PaymentBook < Payment

	def shipping_label()
		super
    	p "Item isento de impostos conforme disposto na Constituicao Art. 150, VI, d."
  	end

end