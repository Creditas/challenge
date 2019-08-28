package com.creditas.challange.model.payment;

import com.creditas.challange.model.domain.Payment;

public class PaymentContext {

	private PaymentStrategy paymentStrategy;
	private Payment payment;
	
	public static class PaymentContextBuilder {
		private PaymentContext context = new PaymentContext();

		public PaymentContextBuilder payment(Payment payment) {
			context.payment = payment;
			return this;
		}

		public PaymentContext build() {
			context.paymentStrategy = PaymentStrategyFactory.get(context.payment.getOrder().getProduct().getType(), context.payment.getOrder().getProduct().getCategory());
			return context;
		}
	}
	
	private PaymentContext() {
	}

	/**
	 * Starts the payment process
	 */
	public void start() {
		paymentStrategy.start(payment);
	}
	
	/**
	 * Validate the payment 
	 */
	public void validate() {
		paymentStrategy.validate(payment);
	}
	
	/**
	 * Process the payment
	 */
	public void process() {
		paymentStrategy.process(payment);
	}
	
	/**
	 * Proceed to the next step
	 */
	public void proceed() {
		paymentStrategy.proceed(payment);
	}


}
