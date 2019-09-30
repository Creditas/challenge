package br.com.creditas.services;

import br.com.creditas.models.Order;
import br.com.creditas.models.Product;

public interface ShippingLabelService {

    public void generate(Order order, Product product);
}
