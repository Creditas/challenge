package br.com.creditas.services;

import br.com.creditas.models.Order;
import br.com.creditas.models.Product;

public class MembershipShippingService implements ShippingService {

    private MembershipService membershipService;
    private EmailService emailService;

    public MembershipShippingService(MembershipService membershipService, EmailService emailService) {
        this.membershipService = membershipService;
        this.emailService = emailService;
    }

    @Override
    public void prepare(Order order, Product product) {
        membershipService.enable(order, product);
        emailService.send(order, product);
    }
}
