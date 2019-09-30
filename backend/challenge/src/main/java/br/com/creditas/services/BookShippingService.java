package br.com.creditas.services;

import br.com.creditas.models.Order;
import br.com.creditas.models.Product;

public class BookShippingService implements ShippingService {

    private ShippingLabelService shippingLabelService;

    public BookShippingService(ShippingLabelService shippingLabelService) {
        this.shippingLabelService = shippingLabelService;
    }

    @Override
    public void prepare(Order order, Product product) {
        shippingLabelService.generate(order, product);
    }
}
