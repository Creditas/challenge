package br.com.store.model.product;

/**
 * Created by tinguan on 26/03/17.
 */
public class Product {

    String name;
    Double price;
    Type type;

    public Product(String name, Double price, Type type) {
        this.name = name;
        this.price = price;
        this.type = type;
    }

    public Type getType() {
        return type;
    }

    public Double getPrice() {
        return price;
    }

    public Boolean isMembership(Type type) {
        return type == Type.MEMBERSHIP;
    }

    public boolean isDigital(Product product){
        return product.getType() == Type.DIGITAL_VIDEO || product.getType() == Type.DIGITAL_MUSIC;
    }

}
