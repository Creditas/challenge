package br.com.store.model.customer;

/**
 * Created by tinguan on 26/03/17.
 */
public class Address {

    String zipCode;
    String billingAddress;
    String shippingAddress;

    public Address(String zipCode, String billingAddress, String shippingAddress) {
        this.zipCode = zipCode;
        this.billingAddress = billingAddress;
        this.shippingAddress = shippingAddress;
    }

    public String getBillingAddress() {
        return billingAddress;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public String getZipCode() {
        return zipCode;
    }
}
