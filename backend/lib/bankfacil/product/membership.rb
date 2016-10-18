
module BankFacil
	class Membership < Product
		attr_reader :active

		def when_order_closed(order)
			# activate subscription
			# inform user by email
			activate_membership(order)
		end
		
		def ship?
			false
		end

		def activate_membership(order)
			@active = true
			Email.send_membership_activated(order.customer)
		end


		def deactivate_membership
			@active = false
			# send email notification
		end
	end
end