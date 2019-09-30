package br.com.creditas.services;

import br.com.creditas.models.Order;
import br.com.creditas.models.Product;
import br.com.creditas.providers.BigDecimalProvider;

public class DigitalShippingService implements ShippingService {

    private EmailService emailService;
    private VoucherService voucherService;

    public DigitalShippingService(EmailService emailService, VoucherService voucherService) {
        this.emailService = emailService;
        this.voucherService = voucherService;
    }

    @Override
    public void prepare(Order order, Product product) {
        emailService.send(order, product);
        voucherService.generate(order.getCustomer(), BigDecimalProvider.create("10"));
    }
}
