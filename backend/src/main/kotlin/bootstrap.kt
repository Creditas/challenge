package challenge

import java.lang.Exception
import java.util.*



//>>>Abaixo a classe contendo os enums de tipos de produto 

enum class ProductType {
    PHYSICAL,
    BOOK,
    DIGITAL,
    MEMBERSHIP
}




//>>> Abaixo a classe de dados produto, pronta para receber os detalhes do produto por parametro 
data class Product(val name: String, val type: ProductType, val price: Double)


//>>> Abaixo a classe endere�o contendo as propriedades somente de leitura referentes ao endere�o
//>>> e a cria��o impl�cita de getters e settters (gostei dessa facilidade no kotlin!)

class Address(private val cep: String,
              private val endereco: String,
              private val cidade: String) {

    //>>>Concatena��o das Strings para serem usadas em apenas uma chamada posteriormente

    val shippingAddressString get() = "$cep, $endereco, $cidade"
    val billingAddressString get() = "$cep, $endereco, $cidade"
}




//>>> Abaixo a classe cliente, contendo todos os dados relativos a este com propriedades de leitura
class Customer(private val firstName: String,
               private val lastName: String,
               private val address: Address, val email: String) {

        //>>> Aqui foi criado uma concatena��o semelhante ao endere�o, 
        //>>> contendo as informa��es reunidas referentes aos dados do cliente e seu respectivo endere�o
        //>>> tanto para quando for chamado os detalhes de gera��o de nota comum ou de shipping label

    val fullName get() = "$firstName $lastName"
    val shippingAddressDetails get() = "To: $firstName $lastName, Address: ${address.shippingAddressString}"
    val billingAddressDetails get() = "To: $firstName $lastName, Address: ${address.billingAddressString}"
}




//>>>Abaixo a classe de dados contendo as propriedades somente de leitura referente a gera��o de pedido
data class Invoice(val order: Order) {
      val billingAddress get() = order.customer.billingAddressDetails
      val shippingAddress get() = order.customer.shippingAddressDetails
}



//>>>interface contendo a fun��o de pagamento
interface PaymentMethod {
    fun transferMoney(total: Double): Boolean
}


//>>>E a classe de dados contendo a verifica��o de m�todo de pagamento e valida��o de cart�o de cr�dito
data class CreditCard(private val number: String) : PaymentMethod {
    private fun creditCardValidated(): Boolean {
        return true
    }



    override fun transferMoney(total: Double): Boolean {
        //>>> Aqui acontecer� o preocessamento do pagamento
        //>>> se tudo ocorrer ok durante a valida��o do cart�o de credito, segue enviando o post

        return if (creditCardValidated()) {
            println("Seu pagamento com o cart�o numero: $number foi aceita!, O total da compra foi: $total")
            println("----------------")
            true
        } else {
            println("O seu cart�o cujo numero � $number , � inv�lido! tente outro cart�o.")
            false
        }
    }
}

//>>> Esta classe de dados foi criada para rastrear o status do pedido caso necess�rio
data class Payment(private val order: Order, val paymentMethod: PaymentMethod) {
    val paidAt = Date()
    val authorizationNumber = paidAt.time
    val amount = order.totalAmount
    val invoice = Invoice(order)
}

//>> respons�vel pela realiza��o do calculo do valor total de cada item
data class OrderItem(val product: Product, private val quantity: Int) {
    val total get() = product.price * quantity
}
//>>> Abaixo a classe pedido que recebe o cliente como par�metro
class Order(private val customer: Customer) {
    private val items = mutableListOf<OrderItem>()
    private var closedAt: Date? = null
    private var payment: Payment? = null
    private var totalDiscount = 0.0
    private val totalAmount
        get() = items.sumByDouble { it.total } - totalDiscount



    //>>> fun��o criada para incluir o produto no pedido, recebendo produto e a quantidade

    fun addProduct(product: Product, quantity: Int) {
        val productAlreadyAdded = items.any { it.product == product }
        if (productAlreadyAdded)
            throw Exception("Esse produto ja foi adicionado anteriormente, mude a quantidade apenas")
        items.add(OrderItem(product, quantity))
    }

    // Aqui s�o calculados os descontos quando a compra for um produto digital

    private fun preProcess() {
        for (it in items) {
            when (it.product.type) {
                ProductType.DIGITAL -> totalDiscount += 10.0
                else -> {
                    totalDiscount += 0.0
                }
            }
        }
    }

    private fun activateServiceSignature(product: Product) {
        //>> ativa��o de assinatura...
        println("SERVI�O DE ATIVA��O: ${product.name} foi ativado!")
        println("----------------")
    }

    private fun printLabel(label: String) {
        // Gera��o de nota...
        println("Nota: $label")
        println("----------------")
    }

    private fun notifyByEmail(to: String, subj: String, message: String) {
        // Aqui acontece a notifica��o por e-mail...
        println("Para: $to")
        println("Assunto: $subj")
        println("Mensagem: $message")
        println("----------------")
    }

    //>>> Aqui acontece a m�gica das notifica��es e regras de neg�cio conforme cada produto escolhido:
    private fun postProcess() {
        // Tendo em vista que um mesmo pedido pode conter v�rios diferentes produtos
        // precisamos percorrer um a um

        for (it in items) {
            // aqui ocorre o controle do fluxo de execu��o dependendo do tipo de produto
            when (it.product.type) {
			//>>sendo um tipo f�sico � chamado a gera��o de shipping label
                ProductType.PHYSICAL -> {
                    val shippingLabel = customer.shippingAddressDetails
                    printLabel(shippingLabel)
                }
                ProductType.MEMBERSHIP -> {
				//>>>sendo uma assinatura, al�m dela ser ativada , o usu�rio receber� uma notifica��o por e-mail
                    activateServiceSignature(it.product)
                    notifyByEmail(customer.email, "Order of ${it.product.name}",
                            "Prezado ${customer.fullName}! " +
                                    "Obrigado por contratar uma assinatura de ${it.product.name}! " +
                                    "O valor total foi de: $${it.total}")
                }
                ProductType.BOOK -> {
                    val shippingLabel = "${customer.billingAddressDetails},  "Order of ${it.product.name}",
							"Este tipo de produto" + 
							"posssui isen��o de impostos conforme disposto na Constitui��o Art. 150, VI, d."
                    printLabel(shippingLabel)
                }
                ProductType.DIGITAL -> {
                    notifyByEmail(customer.email, "Pedido do produto:  ${it.product.name}",
                            "Prezado ${customer.fullName}! " +
                                    "Obrigado pela aquisi��o do produto digital: ${it.product.name}! " +
                                    "O valor total � $${it.total}")
                }
            }
        }
    }

    fun pay(method: PaymentMethod) {
        if (payment != null)
            throw Exception("O pedido j� foi pago!")
        if (items.count() == 0)
            throw Exception("Pedido vazio!")
        //>>> O m�todo de pr� processamento abaixo � respons�vel por calcular o total do pedido, 
		//>>> aplicando desconto de R$ 10,00 para m�dia digital
        preProcess()
        // Abaixo o processamento do pagamento
        payment = Payment(this, method)
        if (method.transferMoney(totalAmount)) {
            postProcess()
            // quando o pagamento j� est� ok e as notifica��es todas realizadas, apenas encerramos
            close()
            println("O pedido foi realizado com sucesso! Obrigado!")
        } else {
            // mas, caso o pagamento falhe, resetamos os descontos e taxas 
            totalDiscount = 0.0
            println("Infelizmente n�o foi poss�vel processar o seu pedido!")
        }
    }

    private fun close() {
        closedAt = Date()
    }
}

//>>> Como fica a chamada dos m�todos e a cria��o de pedidos:

fun generateSampleOrder(): Order {
    //>>> Detalhes para a cria��o do pedido
    val order = Order(Customer("Sonja", "Bitencourte",
            Address("91110000", "Av Vieira Souto 123", "Rio de Janeiro - RJ"),
            "sonjabitencourte@gmail.com"))
    val shirt = Product("Camiseta Ramones", ProductType.PHYSICAL, 35.00)
    val netflix = Product("Plano familiar", ProductType.MEMBERSHIP, 29.90)
    val book = Product("Livro Harry Potter", ProductType.BOOK, 120.00)
    val music = Product("Bob Marley", ProductType.DIGITAL, 15.00)

    //>>> Incluindo os itens no pedido...
    order.addProduct(shirt, 2)
    order.addProduct(netflix, 1)
    order.addProduct(book, 1)
    order.addProduct(music, 1)
    return order
}


fun main(args: Array<String>) {

    val order = generateSampleOrder()
   //>>> Aqui � realizado o pagamento e a gera��o do pedido
    order.pay(CreditCard("43567890-987654367"))
}

