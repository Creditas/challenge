
module BankFacil
	class Membership < Product

		def after
			# activate subscription
			# inform user by email
		end

		def ship?
			false
		end
	end
end