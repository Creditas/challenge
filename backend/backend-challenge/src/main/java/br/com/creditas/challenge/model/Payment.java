package br.com.creditas.challenge.model;

import br.com.creditas.challenge.model.enums.PaymentStatus;

public class Payment {

	private Order order;
	private PaymentStatus status;
	
	public Order getOrder() {
		return order;
	}
	public void setOrder(Order order) {
		this.order = order;
	}
	public PaymentStatus getStatus() {
		return status;
	}
	public void setStatus(PaymentStatus status) {
		this.status = status;
	}
	
}
