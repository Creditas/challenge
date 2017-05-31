package br.com.store.model.order;

import br.com.store.model.customer.Address;

/**
 * Created by tinguan on 26/03/17.
 */
public class ShippingLabel extends OrderDescription {

    private Address address;

    public ShippingLabel(String description, Address address) {
        super.description = description;
        this.address = address;
    }
}
