
module BankFacil
	class Digital < Product

		def after
			# generate voucher
			# send email
			Voucher.create
		end

		def ship?
			false
		end
	end
end