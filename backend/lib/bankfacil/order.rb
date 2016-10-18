
module BankFacil
	class Order
		attr_reader :customer, :items, :closed_at
		attr_reader :address
		attr_accessor :voucher

		def initialize(customer:, address:, voucher:)
			@customer = customer
			@address = address
			@voucher = voucher
			@items = []
		end

		def add_product(product, quantity)
			@items << OrderItem.new(self, product, quantity)
		end

		def total_amount
			amount = @items.map(&:total).inject(:+)
			amount = amount - @voucher.amount if @voucher
			amount = 0 if amount < 0 # amount can't be negative
			amount
		end

		def close(closed_at = Time.now)
    		@closed_at = closed_at
    		@voucher.cancel
    		@items.each { |item| item.when_order_closed }
  		end
	end
end