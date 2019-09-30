package br.com.creditas.services;

import br.com.creditas.models.Order;
import br.com.creditas.models.Product;

public class BookShippingLabelService extends DefaultShippingLabelService implements ShippingLabelService {
    @Override
    public void generate(Order order, Product product) {
        super.generate(order, product);
        product.setTaxExemption(true);
    }
}
