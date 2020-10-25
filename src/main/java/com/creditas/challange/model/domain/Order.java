package com.creditas.challange.model.domain;

import java.math.BigDecimal;

import com.creditas.challange.model.payment.Visitable;
import com.creditas.challange.model.payment.Visitor;

public class Order implements Visitable<Order> {

	private OrderStatus status;
	private Product product;
	private Integer quantity;
	private BigDecimal fees = BigDecimal.ZERO;
	private BigDecimal discount = BigDecimal.ZERO;
	private BigDecimal total = BigDecimal.ZERO;
	private Payment payment;
	private Shipping shipping;
	private User user;

	private Order() {
	}

	public void accept(Visitor<Order> visitor) {
		visitor.visit(this);
	}

	public static class OrderBuilder {
		private Order order = new Order();

		public OrderBuilder product(Product product) {
			order.product = product;
			return this;
		}

		public OrderBuilder quantity(Integer quantity) {
			order.quantity = quantity;
			return this;
		}

		public OrderBuilder discount(BigDecimal discount) {
			order.discount = discount;
			return this;
		}

		public OrderBuilder fees(BigDecimal fees) {
			order.fees = fees;
			return this;
		}

		public OrderBuilder payment(Payment payment) {
			order.payment = payment;
			return this;
		}

		public OrderBuilder user(User user) {
			order.user = user;
			return this;
		}

		public Order build() {
			order.status = OrderStatus.RECEIVED;
			return order;
		}
	}

	public OrderStatus getStatus() {
		return status;
	}

	public Product getProduct() {
		return product;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public BigDecimal getDiscount() {
		return discount;
	}

	public BigDecimal getTotal() {
		return total;
	}

	public Payment getPayment() {
		return payment;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	public void setDiscount(BigDecimal discount) {
		this.discount = discount;
	}

	public Shipping getShipping() {
		return shipping;
	}

	public void setShipping(Shipping shipping) {
		this.shipping = shipping;
	}

	public User getUser() {
		return user;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}

	public BigDecimal getFees() {
		return fees;
	}

	public void setFees(BigDecimal fees) {
		this.fees = fees;
	}

}
