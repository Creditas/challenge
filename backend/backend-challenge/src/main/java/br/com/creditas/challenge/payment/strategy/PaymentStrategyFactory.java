package br.com.creditas.challenge.payment.strategy;

import java.util.logging.Logger;

import br.com.creditas.challenge.model.enums.ProductType;

public class PaymentStrategyFactory {
	
	private static final Logger LOG = Logger.getLogger(PaymentStrategyFactory.class.getName());
	
	public static PaymentStrategy get(ProductType type) {
		LOG.info("PAYMENT STRATEGY FACTORY [productType]: " + type.toString());
		
		switch (type) {
		case PHYSICAL:
			return new PhysicalPaymentStrategy();
		case BOOK:
			return new BookPaymentStrategy();
		case DIGITAL:
			return new DigitalPaymentStrategy();
		case SUBSCRIPTION:
			return new SubscriptionPaymentStrategy();
		default:
			return new DefaultPaymentStrategy();
		}
	}

}
