package br.com.store.model.order;

import br.com.store.model.product.Product;

import java.util.ArrayList;

/**
 * Created by tinguan on 26/03/17.
 */
public class OrderDescription {

    String description;

    public void setDescription(String description) {
        this.description = description;
    }

    public void createEmail(ArrayList<Product> products){
        //IMPLEMENT ME
    }
}
