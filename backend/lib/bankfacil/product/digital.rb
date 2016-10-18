
module BankFacil
	class Digital < Product

		def when_order_closed(order)
			# generate voucher
			# send email
			voucher = Voucher.create(order.customer, 10.00, 20)
			Email.send_digital_product_information(order.customer, self)
			Email.send_voucher_code(order.customer, voucher)
		end

		def ship?
			false
		end
	end
end