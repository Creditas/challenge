
module BankFacil
	class Membership
		attr_reader :active, :customer

		def initialize(customer, active)
			@customer = customer
			@active = active
		end

		def activate
			@active = true
		end

		def cancel
			@active = false
		end
	end
end