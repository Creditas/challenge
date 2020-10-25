package com.creditas.challange.model.domain;

public class Payment {

	private Order order;
	private PaymentType type;
	private Card card;
	private PaymentStatus status;

	private Payment() {
	}
	
	public static class PaymentBuilder {
		private Payment payment = new Payment();

		public PaymentBuilder order(Order order) {
			payment.order = order;
			return this;
		}

		public PaymentBuilder type(PaymentType type) {
			payment.type = type;
			return this;
		}

		public PaymentBuilder card(Card card) {
			payment.card = card;
			return this;
		}

		public Payment build() {
			payment.status = PaymentStatus.WAITING;
			return payment;
		}
	}
	
	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public PaymentType getType() {
		return type;
	}

	public void setType(PaymentType type) {
		this.type = type;
	}

	public PaymentStatus getStatus() {
		return status;
	}

	public void setStatus(PaymentStatus status) {
		this.status = status;
	}

	public Card getCard() {
		return card;
	}

}
