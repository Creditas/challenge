package com.creditas.challange.model.payment;

import java.util.HashMap;
import java.util.Map;

import com.creditas.challange.model.domain.ProductCategory;
import com.creditas.challange.model.domain.ProductType;

public class PaymentStrategyFactory {

	private static Map<Class<? extends PaymentStrategy>, PaymentStrategy> strategies = new HashMap<Class<? extends PaymentStrategy>, PaymentStrategy>();

	private PaymentStrategyFactory() {
	}

	static {
		strategies.put(PhysicalPaymentStrategy.class, PhysicalPaymentStrategy.getInstance());
		strategies.put(DigitalPaymentStrategy.class, DigitalPaymentStrategy.getInstance());
		strategies.put(BookPaymentStrategy.class, BookPaymentStrategy.getInstance());
		strategies.put(SubscriptionPaymentStrategy.class, SubscriptionPaymentStrategy.getInstance());
		strategies.put(DefaultPaymentStrategy.class, DefaultPaymentStrategy.getInstance());
	}

	public static PaymentStrategy get(ProductType type, ProductCategory category) {
		switch (type) {
		case PHYSICAL:
			switch (category) {
			case BOOK:
				return strategies.get(BookPaymentStrategy.class);
			default:
				return strategies.get(PhysicalPaymentStrategy.class);
			}
		case DIGITAL:
			switch (category) {
			case SUBSCRIPTION:
				return strategies.get(SubscriptionPaymentStrategy.class);
			default:
				return strategies.get(DigitalPaymentStrategy.class);
			}
		default:
			return strategies.get(DefaultPaymentStrategy.class);
		}
	}

}
