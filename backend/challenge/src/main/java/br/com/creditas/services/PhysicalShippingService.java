package br.com.creditas.services;

import br.com.creditas.models.Order;
import br.com.creditas.models.Product;

public class PhysicalShippingService implements ShippingService {

    private ShippingLabelService shippingLabelService;

    public PhysicalShippingService(ShippingLabelService shippingLabelService) {
        this.shippingLabelService = shippingLabelService;
    }

    public void prepare(Order order, Product product) {
        shippingLabelService.generate(order, product);
    }
}
