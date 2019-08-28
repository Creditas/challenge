package com.creditas.challange.model.card;

import java.util.HashMap;
import java.util.Map;

import com.creditas.challange.model.domain.PaymentType;

public class CardServiceProviderFactory {
	
	private static Map<PaymentType, CardServiceProvider> providers = new HashMap<PaymentType, CardServiceProvider>();

	private CardServiceProviderFactory() {
	}

	static {
		providers.put(PaymentType.CREDIT_CARD, DefaultCreditCardServiceProvider.getInstance());
		providers.put(PaymentType.DEBIT_CARD, DefaultDebitCardServiceProvider.getInstance());
	}

	public static CardServiceProvider get(PaymentType type) {
		switch (type) {
		case CREDIT_CARD:
		case DEBIT_CARD:
			return providers.get(type);
		default:
			throw new RuntimeException("Payment type not supported!");
		}
	}

}
