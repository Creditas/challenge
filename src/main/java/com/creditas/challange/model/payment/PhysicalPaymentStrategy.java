package com.creditas.challange.model.payment;

import com.creditas.challange.model.domain.Payment;
import com.creditas.challange.model.domain.Shipping.ShippingBuilder;
import com.creditas.challange.model.domain.ShippingLabel;

public class PhysicalPaymentStrategy extends AbstractPaymentStrategy {

	private static final PhysicalPaymentStrategy INSTANCE = new PhysicalPaymentStrategy();

	private PhysicalPaymentStrategy() {
	}

	public static PhysicalPaymentStrategy getInstance() {
		return INSTANCE;
	}
	
	@Override
	public void afterChargeWithSuccess(Payment payment) {
		super.afterChargeWithSuccess(payment);
		
		payment.getOrder().setShipping(new ShippingBuilder()
				.label(ShippingLabel.MUST_BE_BOXED)
				.build());
	}
}
