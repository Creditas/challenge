package challenge.services

import challenge.infrastructure.repositories.business.Customer
import challenge.infrastructure.repositories.business.Product
import challenge.infrastructure.repositories.business.products.Membership
import challenge.infrastructure.repositories.mail.MailDealer
import challenge.infrastructure.repositories.membership.MembershipDealer

class MembershipService {
    companion object {
        @JvmStatic
        fun activate(products: List<Product>, customer: Customer) {
            // Caso o pagamento seja uma assinatura de serviço,
            // você precisa ativar a assinatura, e notificar o
            // usuário através de e-mail sobre isto;
            products.filterIsInstance<Membership>().forEach {
                MembershipDealer.activate(it.name)
                MailDealer.sendMail(customer.email, "")
            }
        }
    }
}