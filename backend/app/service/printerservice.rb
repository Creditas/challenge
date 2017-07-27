class PrinterService
	attr_reader :item

	def initialize(item)
		@item = item
	end

	def print
		puts "Printing label: #{item.shipping_label}"
	end
end