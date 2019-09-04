package challenge.services

import challenge.infrastructure.repositories.business.*
import challenge.infrastructure.repositories.business.products.Book
import challenge.infrastructure.repositories.business.products.Physical
import challenge.infrastructure.repositories.shipping.ShippingDealer

class ShippingService {
    companion object {
        @JvmStatic
        fun generateLabel(products: List<Product>) {
            if(products.any { product -> product is Physical }) {
                // Se o pagamento for para um item físico,
                // você deverá gerar um `shipping label`
                // para o mesmo ser colocado na caixa do envio;
                ShippingDealer.generateShippingLabel("Go to shipping box.")
            }

            // Caso o pagamento seja um livro comum, você precisa gerar o `shipping label`
            // com uma notificação de que trata-se de um item isento de impostos conforme
            // disposto na Constituição Art. 150, VI, d.
            products.filterIsInstance<Book>().forEach {
                ShippingDealer.generateShippingLabel(it.name, "Tax Free Product (Constitution Art. 150, VI, d).")
            }

        }
    }
}