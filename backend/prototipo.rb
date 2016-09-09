class TipoPagamento
	attr_reader :pagamento
	def initialize(pagamento:)
		@pagamento = pagamento
	end
	def trataPagamento
	end
	def enviarEmail
	end
end

class PagamentoItemFisico < TipoPagamento
	def trataPagamento
		puts "Endereço:" << pagamento.order.addres
		puts "shipping label a ser gerada:" << pagamento.order.items.first.product.name
	end
end

class PagamentoAssinaturaServico < TipoPagamento
	def enviarEmail
		puts "Assinatura ativada ao comprador " << pagamento.order.customer
	end
	def trataPagamento
		#Ativação da assinatura		
		enviarEmail
		puts
	end
end

class PagamentoLivro < TipoPagamento
	def trataPagamento			
		puts "shipping label informando que o item é isento de impostos"
	end
end
class PagamentoMidiaDigital < TipoPagamento
	def TotalComDesconto
		pagamento.order.total_amount - 10
	end
	def enviarEmail
		puts "Dados da compra: Data: " << pagamento.order.closed_at << Produtos
		@pagamento.order.items.each do |item|
      		puts item.product.nome
      	puts "Você recebeu um desconto de R$ 10,00 por isso o valor total é de: " << TotalComDesconto	
	end
	def trataPagamento
		enviarEmail
	end
end

def direcionaPagamento(pagamento)
	if pagamento.order.items.first.product.type == :book
		exemplo = PagamentoLivro.new(pagamento: pagamento)
		elsif pagamento.order.items.first.product.type == :physical
			exemplo = PagamentoItemFisico.new(pagamento: pagamento)
			elsif pagamento.order.items.first.product.type == :digital
				exemplo = PagamentoMidiaDigital.new(pagamento: pagamento)
				elsif pagamento.order.items.first.product.type == :membership
					exemplo = PagamentoAssinaturaServico.new(pagamento: pagamento)
				end
				exemplo.trataPagamento
			end		
		
direcionaPagamento(payment_book)	