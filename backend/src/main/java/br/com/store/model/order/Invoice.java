package br.com.store.model.order;

import br.com.store.model.product.Membership;
import br.com.store.model.product.Product;

import java.util.ArrayList;

/**
 * Created by tinguan on 26/03/17.
 */
public class Invoice {
    private String billingAddress;
    private String shippingAddress;
    private ArrayList<Membership> memberships;
    public Invoice(String billingAddress, String shippingAddress) {
        this.billingAddress = billingAddress;
        this.shippingAddress = shippingAddress;
    }

    public void setMemberships(ArrayList<Membership> memberships) {
        this.memberships = memberships;
    }

    public ArrayList<Membership> activateMembership(ArrayList<Product> products) {
        ArrayList<Membership> memberships = new ArrayList<Membership>();
        for (Product product : products) {
            if (product.isMembership(product.getType())) {
                memberships.add(new Membership(product, true));
            }
        }
        return memberships;
    }

    public ArrayList<Membership> getMemberships() {
        return memberships;
    }
}
