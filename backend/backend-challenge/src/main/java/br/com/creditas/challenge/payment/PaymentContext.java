package br.com.creditas.challenge.payment;

import java.util.logging.Logger;

import br.com.creditas.challenge.model.Payment;
import br.com.creditas.challenge.model.enums.PaymentStatus;
import br.com.creditas.challenge.payment.strategy.PaymentStrategy;
import br.com.creditas.challenge.payment.strategy.PaymentStrategyFactory;

public class PaymentContext {
	
	private static final Logger LOG = Logger.getLogger(PaymentContext.class.getName());
	
	private PaymentStrategy paymentStrategy;
	private Payment payment;
	
	public static class PaymentContextBuilder {
		private PaymentContext context = new PaymentContext();

		public PaymentContextBuilder payment(Payment payment) {
			context.payment = payment;
			return this;
		}

		public PaymentContext build() {
			LOG.info("BUILDING PAYMENT CONTEXT");
			context.paymentStrategy = PaymentStrategyFactory.get(context.payment.getOrder().getProduct().getType());
			return context;
		}
	}
		
	public void start() {
		paymentStrategy.start(payment);
	}

	public void validate() {
		paymentStrategy.validate(payment);
	}

	public void process() {
		paymentStrategy.process(payment);
	}
	
	public PaymentStatus proceed() {
		return paymentStrategy.proceed(payment);
	}

}
