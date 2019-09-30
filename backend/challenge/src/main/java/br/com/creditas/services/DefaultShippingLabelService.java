package br.com.creditas.services;

import br.com.creditas.models.Order;
import br.com.creditas.models.Product;
import br.com.creditas.models.ShippingLabel;

public class DefaultShippingLabelService implements ShippingLabelService {
    @Override
    public void generate(Order order, Product product) {
        product.setShippingLabel(new ShippingLabel(order, product));
    }
}
