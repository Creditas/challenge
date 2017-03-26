package br.com.store.model.product;


import java.util.ArrayList;

/**
 * Created by tinguan on 26/03/17.
 */
public class Membership {
    Product product;
    boolean isActive;

    public Membership(Product product, boolean isActive) {
        this.product = product;
        this.isActive = isActive;
    }
}
