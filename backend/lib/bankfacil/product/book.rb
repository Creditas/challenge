
module BankFacil
	class Book < Product
		
		def when_payment_confirmed
			# print notification that is tax free
			puts "Item isento de impostos conforme disposto na Constituição Art. 150, VI, d."
		end

		def ship?
			true
		end
	end
end