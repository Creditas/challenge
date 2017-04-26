# Definição da classe de pagamento
class Payment
	  attr_reader :type_product, :description, :price, :name_customer, :shipping_address, :email
	  def initialize(type_product, description, price, name_customer, shipping_address, email)
	    @type_product = type_product
	    @description = description
	    @price = price
	    @name_customer = name_customer
	    @shipping_address = shipping_address
	    @email = email
	  end
	end
	
	# Definição do metodo quando o pagamento for para item fisico
	def physical
		zipcode = "34700000"
		generate_shipping_label(@name_customer, @shipping_address, zipcode)
	end
	
	# Definição do metodo quando o pagamento for para assinatura de serviço
	def service
		active_signature = true
		#Aqui vai a chamada para envio de e-mail confirmação = sent_email_confirmation(@email)
		sent_email(active_signature, @email)
	end

	# Definição do metodo para pagamento de livros
	def book
		taxes = "Trata-se de um item isento de impostos conforme disposto na Constituição Art. 150, VI, d."
		generate_shipping_label = [@name_customer, @shipping_address, taxes]
	end

	# Definição do metodo para pagamento digital
	def digital()
		sent_email(@description, @email)
		give_voucher_10()
	end

	private
	#metodo para enviar e-mail
	def sent_email (description, email)
		if @type_product == service
			puts "Email de confirmação enviado com sucesso para: #{email}"

		elsif @type_product == digital
			puts "Produto #{description} liberado com sucesso para: #{email}"
		end
	end
	# metodo para gerar a etiqueta
	def generate_shipping_label (name_customer, shipping_label, description)
		@shipping_label = [name_customer, shipping_address, description]
		puts "Etiqueta gerado com sucesso!"
	end
	# Metodo para gerar cupom de desconto
	def give_voucher_10
		puts "Você ganhou um voucher de R$10 de desconto para a próxima compra"
	end

end

#instanciando o objeto com os valores
payment = Payment.new("physical", "description_test", 100, "name_customer", "shipping_address", "email@email.com")
if payment.type_product == physical
		physical()
	elsif payment.type_product == service
		service()
	elsif payment.type_product == book
		book()
	else
		digital()
end