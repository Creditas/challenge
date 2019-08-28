package com.creditas.challange.model.card;

import com.creditas.challange.model.domain.Payment;
import com.creditas.challange.model.domain.PaymentStatus;

public class DefaultCreditCardServiceProvider implements CardServiceProvider {

	private static final DefaultCreditCardServiceProvider INSTANCE = new DefaultCreditCardServiceProvider();

	private DefaultCreditCardServiceProvider() {
	}

	public static DefaultCreditCardServiceProvider getInstance() {
		return INSTANCE;
	}
	
	public PaymentStatus process(Payment payment) {
		return PaymentStatus.APPROVED;
	}
}
