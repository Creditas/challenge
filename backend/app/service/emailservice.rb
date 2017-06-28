class EmailService
	attr_reader :email, :message

	def initialize(email, message)
		@email = email
		@message = message
	end

	def send
		puts "Sending email: #{message} to #{email}"
	end
end