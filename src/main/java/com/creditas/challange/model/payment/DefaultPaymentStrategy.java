package com.creditas.challange.model.payment;

public class DefaultPaymentStrategy extends AbstractPaymentStrategy {

	private static final DefaultPaymentStrategy INSTANCE = new DefaultPaymentStrategy();

	private DefaultPaymentStrategy() {
	}

	public static DefaultPaymentStrategy getInstance() {
		return INSTANCE;
	}
}
