import br.com.creditas.builders.OrderBuilder;
import br.com.creditas.builders.PaymentBuilder;
import br.com.creditas.enums.PaymentType;
import br.com.creditas.facades.DefaultShippingFacade;
import br.com.creditas.facades.ShippingFacade;
import br.com.creditas.factories.PaymentServiceFactory;
import br.com.creditas.models.*;
import br.com.creditas.services.PaymentService;

import static br.com.creditas.enums.ProductType.*;
import static br.com.creditas.providers.BigDecimalProvider.create;

public class Main {

    public static void main(String[] args) {
        Payment payment = new PaymentBuilder()
        .paymentType(PaymentType.CREDIT_CARD)
        .paymentMethod(new CreditCard("43567890-987654367"))
        .build();

        Product[] products = {new Product("Flowered t-shirt", PHYSICAL, create("35.00")),
         new Product("Familiar plan", MEMBERSHIP, create("29.90")),
         new Product("The Hitchhiker's Guide to the Galaxy", BOOK, create("120.00")),
         new Product("Stairway to Heaven", DIGITAL, create("5.00"))};

        Order order = new OrderBuilder()
        .number(1L)
        .customer(new Customer())
        .address(new Address())
        .product(products)
        .payment(payment)
        .build();

        PaymentService paymentService = PaymentServiceFactory.getInstance(payment.getPaymentType());
        paymentService.pay(order);

        ShippingFacade shippingFacade = new DefaultShippingFacade();
        shippingFacade.processShipping(order);
    }
}
