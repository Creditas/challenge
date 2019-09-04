package challenge.application

import challenge.domain.*
import challenge.infra.FakeSignatureRepo
import challenge.infra.SignatureRepo

object OrderService {
    fun completeOrder(order: Order, paymentMethod: PaymentMethod){
        order.pay(paymentMethod)

        for(i in order.items){
            shipItem(i)
        }
    }

    private fun shipItem(orderItem: OrderItem){
        orderItem.product.type.shipItem(orderItem)
    }
}

object SignatureService {
    // TODO use something to resolve DI
    private val signatureRepo: SignatureRepo = FakeSignatureRepo;

    fun activate(product: Product, customer: Customer){
        val signature = signatureRepo.findByProductAndCustomer(product, customer)
        signature.activate()
        signatureRepo.save(signature)

        // A valid email should be created here
        val email = Email();
        email.send();
    }
}
