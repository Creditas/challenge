package br.com.creditas.models;

import br.com.creditas.enums.ProductType;

import java.math.BigDecimal;

public class Product {

    private String name;
    private ProductType productType;
    private BigDecimal value;
    private Boolean taxExemption;
    private ShippingLabel shippingLabel;

    public Product(){}

    public Product(String name, ProductType productType, BigDecimal value) {
        this.name = name;
        this.productType = productType;
        this.value = value;
    }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public ProductType getProductType() { return productType; }

    public void setProductType(ProductType productType) { this.productType = productType; }

    public BigDecimal getValue() { return value; }

    public void setValue(BigDecimal value) { this.value = value; }

    public Boolean getTaxExemption() { return taxExemption; }

    public void setTaxExemption(Boolean taxExemption) { this.taxExemption = taxExemption; }

    public ShippingLabel getShippingLabel() { return shippingLabel; }

    public void setShippingLabel(ShippingLabel shippingLabel) { this.shippingLabel = shippingLabel; }

}
