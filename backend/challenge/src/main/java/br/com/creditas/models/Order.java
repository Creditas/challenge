package br.com.creditas.models;

import java.util.List;

public class Order {
    private Long number;
    private Customer customer;
    private Address address;
    private List<Product> products;
    private Payment payment;

    public Order() { }

    public Order(Long number, Customer customer, Address address, List<Product> products, Payment payment) {
        this.number = number;
        this.customer = customer;
        this.address = address;
        this.products = products;
        this.payment = payment;
    }

    public List<Product> getProducts() { return products; }

    public void setProducts(List<Product> products) { this.products = products; }

    public Payment getPayment() { return payment; }

    public void setPayment(Payment payment) { this.payment = payment; }

    public Customer getCustomer() { return customer; }

    public void setCustomer(Customer customer) { this.customer = customer; }

    public Address getAddress() { return address; }

    public void setAddress(Address address) { this.address = address; }

    public Long getNumber() { return number; }

    public void setNumber(Long number) { this.number = number; }
}


