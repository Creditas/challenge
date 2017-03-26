package br.com.store.model.order;

import br.com.store.model.customer.Address;
import br.com.store.model.customer.Customer;
import br.com.store.model.product.Product;
import br.com.store.model.product.Type;

import java.util.ArrayList;
import java.util.Calendar;

/**
 * Created by tinguan on 26/03/17.
 */
public class Order {
    Customer customer;
    ArrayList<Product> items = new ArrayList<Product>();
    Calendar closedAt;
    Address address;

    public Order(Customer customer, Calendar closedAt, String zipCode, String billingAddress, String shippingAddress) {
        this.customer = customer;
        this.closedAt = closedAt;
        this.address = new Address(zipCode, billingAddress, shippingAddress);
    }

    public void addItem(Product item) {
        this.items.add(item);
    }

    public ArrayList<Product> getItems() {
        return items;
    }

    public Address getAddress() {
        return address;
    }

    public void setClosedAt(Calendar closedAt) {
        this.closedAt = closedAt;
    }

    public Boolean hasDigitalOrSignature(ArrayList<Product> products) {
        for (Product product : products) {
            if (product.isDigital(product)) {
                return true;
            }
        }
        return false;
    }

    public Boolean hasBook(ArrayList<Product> products) {
        for (Product product : products) {
            if (product.getType() == Type.BOOK) {
                return true;
            }
        }
        return false;
    }

    public ArrayList<Product> getDigitalProducts(ArrayList<Product> products) {
        ArrayList<Product> digitalProducts = new ArrayList<Product>();
        for (Product product : products) {
            if (product.isDigital(product)) {
                digitalProducts.add(product);
            }
        }
        return digitalProducts;
    }


}
