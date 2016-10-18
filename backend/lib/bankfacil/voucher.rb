
module BankFacil
	class Voucher
		attr_reader :amount, :code, :expiration_date, :active

		def initialize(amount:, code:, expiration_date:, active:)
			@amount = amount
			@code = code
			@expiration_date = expiration_date
			@active = active
		end
		

		def self.create(customer, amount, days)
			# generate voucher, send email to user
			code = generate_voucher_code
			expiration_date = calculate_expiration_date(days)
			Voucher.new(amount: 10.00, code: code, expiration_date: expiration_date, active: true)

		end

		def cancel
			# cancel a voucher that was used by a customer
			@active = false
		end

		def valid?
			# checks if the voucher is valid
			@active && !expired?
		end


		private

		def self.generate_voucher_code
			# generate unique voucher code
		end

		def expired?
			# check if the voucher is not expired
		end

		def self.calculate_expiration_date(days)
			# calculate expiration date
		end
	end
end