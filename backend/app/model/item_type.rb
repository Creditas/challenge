class ItemType
	attr_reader :item_type

	def initialize()
		@item_type = {:service => "Assinatura Serviço", :book => "Livro", 
						:digital_media => "'Mídia Digital", :item => "Ítem Físico"}
	end

	def item_type
		@item_type
	end

end