package br.com.creditas.services;

import br.com.creditas.models.Order;
import br.com.creditas.models.Product;

public interface ShippingService {
    void prepare(Order order, Product product);
}
