package com.creditas.challange.model;

import com.creditas.challange.model.domain.Payment;
import com.creditas.challange.model.payment.PaymentContext;
import com.creditas.challange.model.payment.PaymentContext.PaymentContextBuilder;

public class PaymentListener {

	/**
	 * Poll payment event from from a broker
	 * 
	 * @param payment
	 */
	public void receive(Payment payment) {
		PaymentContext context = new PaymentContextBuilder().payment(payment).build();
		context.start();
		context.validate();
		context.process();
		context.proceed();
	}

}
