package br.com.creditas.services;

import br.com.creditas.models.Order;

public interface PaymentService {
    void pay(Order order);
}
