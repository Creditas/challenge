class ShippingLabel
attr_reader :shipping_address,:from, :to, :weight, :tribute

	def initialize(attributes = {})
	@shipping_address = attributes.values_at(:shipping_address)
	@from = attributes.values_at(:from)
	@to = attributes.values_at(:to)
	@weight = attributes.values_at(:weight)
	@tribute = attributes.values_at(:tribute)
	end

	def create_shipping()
		puts "shipping criado com sucesso"
		puts "item isento de impostos conforme legislação presente" if @tribute 
	end		
end