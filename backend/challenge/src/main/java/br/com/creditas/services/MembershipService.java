package br.com.creditas.services;

import br.com.creditas.models.Order;
import br.com.creditas.models.Product;

public interface MembershipService {
    public void enable(Order order, Product product);
}
