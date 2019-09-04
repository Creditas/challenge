package challenge.infra

import challenge.domain.Customer
import challenge.domain.Product
import challenge.domain.Signature

interface SignatureRepo {
    fun findByProductAndCustomer(product: Product, customer: Customer): Signature;
    fun save(signature:Signature);
}

object FakeSignatureRepo:SignatureRepo {
    override fun save(signature: Signature) {
        // TODO implement
        println("Signature saved!");
    }

    override fun findByProductAndCustomer(product: Product, customer: Customer): Signature {
        // TODO fake implementation
        return Signature();
    }
}
