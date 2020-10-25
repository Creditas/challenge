package com.creditas.challange.model.domain;

import java.math.BigDecimal;

public class Product {

	private ProductType type;
	private ProductCategory category;
	private BigDecimal price;
	private Long quantityInStock;

	private Product() {
	}

	public static class ProductBuilder {
		private Product product = new Product();

		public ProductBuilder type(ProductType type) {
			product.type = type;
			return this;
		}

		public ProductBuilder category(ProductCategory category) {
			product.category = category;
			return this;
		}

		public ProductBuilder price(BigDecimal price) {
			product.price = price;
			return this;
		}

		public ProductBuilder quantityInStock(Long quantityInStock) {
			product.quantityInStock = quantityInStock;
			return this;
		}

		public Product build() {
			return product;
		}
	}

	public ProductType getType() {
		return type;
	}

	public ProductCategory getCategory() {
		return category;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public Long getQuantityInStock() {
		return quantityInStock;
	}
}
