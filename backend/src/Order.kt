package challenge

import java.util.*

/* rules
* Se o pagamento for para um item físico, você deverá gerar um shipping label para o mesmo ser colocado na caixa do envio;
*
Caso o pagamento seja uma assinatura de serviço, você precisa ativar a assinatura, e notificar o usuário através de e-mail sobre isto;

Caso o pagamento seja um livro comum, você precisa gerar o shipping label com uma notificação de que trata-se de um item isento de impostos
conforme disposto na Constituição Art. 150, VI, d.

Caso o pagamento seja de alguma mídia digital (música, vídeo), além de enviar a descrição da compra por e-mail ao comprador,
conceder um voucher de desconto de R$ 10 ao comprador associado ao pagamento.
* */

class Order(val customer: Customer, val address: Address) {

    private val items = mutableListOf<OrderItem>()

    var closedAt: Date? = null
        private set
    var payment: Payment? = null
        private set
    val totalAmount
        get() = items.sumByDouble { it.total }

    fun addProduct(product: Product, quantity: Int) {
        val productAlreadyAdded = items.any { it.product == product }
        if (productAlreadyAdded)
            throw Exception("The product have already been added. Change the amount if you want more.")

        items.add(OrderItem(product, quantity))
    }

    fun pay(method: PaymentMethod) {
        if (payment != null)
            throw Exception("The order has already been paid!")

        if (items.count() == 0)
            throw Exception("Empty order can not be paid!")

        payment = Payment(this, method)

        close()
    }

    private fun close() {
        closedAt = Date()
    }

    fun processOrderItems() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
}

data class OrderItem(val product: Product, val quantity: Int) {
    val total get() = product.price * quantity
}