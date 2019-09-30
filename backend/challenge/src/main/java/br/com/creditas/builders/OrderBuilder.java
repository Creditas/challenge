package br.com.creditas.builders;

import br.com.creditas.models.*;

import java.util.Arrays;
import java.util.List;

public class OrderBuilder {
    private Long number;
    private Customer customer;
    private Address address;
    private List<Product> products;
    private Payment payment;

    public OrderBuilder number(Long number) {
        this.number = number;
        return this;
    }

    public OrderBuilder customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public OrderBuilder address(Address address) {
        this.address = address;
        return this;
    }

    public OrderBuilder product(Product...products) {
        this.products = Arrays.asList(products);
        return this;
    }

    public OrderBuilder payment(Payment payment) {
        this.payment = payment;
        return this;
    }

    public Order build() {
        return new Order(number, customer, address, products, payment);
    }
}
