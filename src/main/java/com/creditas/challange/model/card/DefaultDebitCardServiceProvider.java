package com.creditas.challange.model.card;

import com.creditas.challange.model.domain.Payment;
import com.creditas.challange.model.domain.PaymentStatus;

public class DefaultDebitCardServiceProvider implements CardServiceProvider {

	private static final DefaultDebitCardServiceProvider INSTANCE = new DefaultDebitCardServiceProvider();

	private DefaultDebitCardServiceProvider() {
	}

	public static DefaultDebitCardServiceProvider getInstance() {
		return INSTANCE;
	}

	public PaymentStatus process(Payment payment) {
		return PaymentStatus.APPROVED;
	}
}
