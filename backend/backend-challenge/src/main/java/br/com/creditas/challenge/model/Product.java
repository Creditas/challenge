package br.com.creditas.challenge.model;

import java.math.BigDecimal;

import br.com.creditas.challenge.model.enums.ProductType;

public class Product {

	private ProductType type;
	private BigDecimal price;
	
	public ProductType getType() {
		return type;
	}
	public void setType(ProductType type) {
		this.type = type;
	}
	public BigDecimal getPrice() {
		return price;
	}
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	
}
