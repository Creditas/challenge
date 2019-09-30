package br.com.creditas.facades;

import br.com.creditas.factories.ShippingServiceFactory;
import br.com.creditas.models.Order;
import br.com.creditas.services.ShippingService;

public class DefaultShippingFacade implements ShippingFacade {

    public void processShipping(Order order) {
        order.getProducts().parallelStream().forEach( product -> {
            ShippingService shippingService = ShippingServiceFactory.getInstance(product.getProductType());
            shippingService.prepare(order, product);
        });

    }
}
