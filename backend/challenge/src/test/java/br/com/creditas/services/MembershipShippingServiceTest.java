package br.com.creditas.services;

import br.com.creditas.models.Order;
import br.com.creditas.models.Product;
import org.junit.Before;
import org.junit.Test;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

public class MembershipShippingServiceTest {

    private ShippingService shippingService;
    private MembershipService membershipService;
    private EmailService emailService;

    @Before
    public void init() {
        membershipService = mock(MembershipService.class);
        emailService = mock(EmailService.class);
        shippingService = new MembershipShippingService(membershipService, emailService);
    }

    @Test
    public void prepare_called_success() {
        Order order = mock(Order.class);
        Product product = mock(Product.class);

        shippingService.prepare(order, product);

        verify(membershipService).enable(order, product);
        verify(emailService).send(order, product);
    }
}
