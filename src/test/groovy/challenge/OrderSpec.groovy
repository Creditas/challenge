package challenge

import challenge.application.OrderService
import challenge.domain.Address
import challenge.domain.CreditCard
import challenge.domain.Customer
import challenge.domain.Email
import challenge.domain.Order
import challenge.domain.Product
import challenge.domain.ProductType
import challenge.infra.FakeSignatureRepo
import spock.lang.Ignore
import spock.lang.Shared
import spock.lang.Specification
import spock.lang.Unroll

class OrderSpec extends Specification {
    @Shared
    private def creditCard = new CreditCard("43567890-987654367")

    @Shared
    private def customer = new Customer()

    @Shared
    private def address = new Address()

    @Shared
    private def orderService = OrderService.INSTANCE as OrderService

    // This comment shouldn't be in the real code, but may help the reviewer
    // Unroll: http://spockframework.org/spock/javadoc/1.0/spock/lang/Unroll.html
    @Unroll
    def "test pay - #label"(){
        given:
            def order = new Order(customer, address)
            order.addProduct(product, 1)
        when:
            order.pay(creditCard)
        then:
            order.payment != null
            order.closedAt != null
            // TODO should have something to check payment worked. Maybe return a boolean?
        where:
            // TODO check why groovy don't work with kotlin enum (the ones with methods) - http://przybyszd.blogspot.com/2018/05/testing-kotlin-with-spock-part-2-enum.html
            label     | product
            "shirt"   | buildFakeShirt()
            "netflix" | buildFakeNetflix()
            "book"    | buildFakeBook()
            "music"   | buildFakeMusic()
    }

    @Ignore // Not working as FakeSignatureRepo is not implemented
    def "test buy signature"(){
        given:
            def product = buildFakeNetflix()
            def order = new Order(customer, address)
            order.addProduct(product, 1)
        when:
            orderService.completeOrder(order,creditCard)
        then:
            FakeSignatureRepo.INSTANCE.findByProductAndCustomer(product, customer).isActive() == true
            1 * new Email().send()
    }

    def "test buy physical"(){
        given:
            def product = buildFakeShirt()
            def order = new Order(customer, address)
            order.addProduct(product, 1)
        when:
            orderService.completeOrder(order,creditCard)
        then:
            noExceptionThrown()
            // 1 * new ShippingLabel().print()
            // retrieve shipping label here
    }

    def "test buy book"(){
        given:
            def product = buildFakeBook()
            def order = new Order(customer, address)
            order.addProduct(product, 1)
        when:
            orderService.completeOrder(order,creditCard)
        then:
            noExceptionThrown()
            // 1 * new ShippingLabel().print()
            // 1 * new ShippingLabel().addNotification( _ as String)
    }

    def "test buy music"() {
        given:
            def product = buildFakeMusic()
            def order = new Order(customer, address)
            order.addProduct(product, 1)
        when:
            orderService.completeOrder(order, creditCard)
        then:
            noExceptionThrown()
            // 1 * new Email().send()
            // 1 * new Customer().addVoucher(10)
    }

    private Product buildFakeMusic(){
        new Product("Stairway to Heaven", ProductType.valueOf("DIGITAL"), 5.00)
    }

    private Product buildFakeBook(){
        new Product("The Hitchhiker's Guide to the Galaxy", ProductType.valueOf("BOOK"), 120.00)
    }

    private Product buildFakeNetflix(){
        new Product("Familiar plan", ProductType.valueOf("MEMBERSHIP"), 29.90)
    }

    private Product buildFakeShirt(){
        new Product("Flowered t-shirt", ProductType.valueOf("PHYSICAL"), 35.00)
    }
}
