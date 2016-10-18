
module BankFacil
	class Email
		attr_reader :to, :from, :subject, :body

		def self.send_voucher_code(customer, voucher)
			Email.new(customer.email, 'noreply@bankfacil.com','VOUCHER',"YOU GOT R$ 10,00. YOUR CODE IS #{voucher.code}").send
		end

		def self.send_membership_activated(customer)
			Email.new(customer.email, 'noreply@bankfacil.com', 'MEMBERSHIP ACTIVATED', 'YOUR MEMBERSHIP IS ACTIVE').send
		end

		def self.send_digital_product_information(customer, product)
			Email.new(customer.email, 'noreply@bankfacil.com', 'PRODUCT INFORMATIAON', "#{product.description}").send
		end

		def initialize(to, from, subject, body)
			@to = to
			@from = from
			@subject = subject
			@body = body
		end
		
		def send
			# send email
		end
	end
end