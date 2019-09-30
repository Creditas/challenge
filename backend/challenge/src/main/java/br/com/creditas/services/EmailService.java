package br.com.creditas.services;

import br.com.creditas.models.Order;
import br.com.creditas.models.Product;

public interface EmailService {
    public void send(Order order, Product product);
}
