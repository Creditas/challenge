package com.creditas.challange.model.payment;

import com.creditas.challange.model.domain.Payment;
import com.creditas.challange.model.domain.Shipping.ShippingBuilder;
import com.creditas.challange.model.domain.ShippingLabel;

public class BookPaymentStrategy extends AbstractPaymentStrategy {
	
	private static final BookPaymentStrategy INSTANCE = new BookPaymentStrategy();

	private BookPaymentStrategy() {
	}

	public static BookPaymentStrategy getInstance() {
		return INSTANCE;
	}
	
	@Override
	public boolean beforeProcess(Payment payment) {
		payment.getOrder().accept(new BookDiscountVisitor());
		return super.beforeProcess(payment);
	}

	@Override
	public void afterChargeWithSuccess(Payment payment) {
		super.afterChargeWithSuccess(payment);
		
		payment.getOrder().setShipping(new ShippingBuilder()
			.label(ShippingLabel.FEE_FREE)
			.label(ShippingLabel.MUST_BE_BOXED)
			.build());
	}
}
