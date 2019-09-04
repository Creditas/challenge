package challenge.services

import challenge.infrastructure.repositories.business.Customer
import challenge.infrastructure.repositories.business.Product
import challenge.infrastructure.repositories.business.products.Digital
import challenge.infrastructure.repositories.mail.MailDealer

class DigitalService {
    companion object {
        @JvmStatic
        fun activate(products: List<Product>, customer: Customer) {
            // Caso o pagamento seja de alguma mídia digital (música, vídeo),
            // além de enviar a descrição da compra por e-mail ao comprador,
            // conceder um voucher de desconto de R$ 10 ao comprador associado ao pagamento.
            products.filterIsInstance<Digital>().forEach {
                MailDealer.sendMail(customer.email, it.name)
                MailDealer.sendVoucher(customer.email, 10.00,"")
            }
        }
    }
}