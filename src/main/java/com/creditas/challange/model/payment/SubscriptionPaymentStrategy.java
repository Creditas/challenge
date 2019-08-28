package com.creditas.challange.model.payment;

import com.creditas.challange.model.domain.Email;
import com.creditas.challange.model.domain.Email.EmailBuilder;
import com.creditas.challange.model.domain.Payment;
import com.creditas.challange.model.email.EmailProvider;
import com.creditas.challange.model.email.EmailServiceProviderFactory;

public class SubscriptionPaymentStrategy extends AbstractPaymentStrategy {
	
	private static final SubscriptionPaymentStrategy INSTANCE = new SubscriptionPaymentStrategy();

	private SubscriptionPaymentStrategy() {
	}

	public static SubscriptionPaymentStrategy getInstance() {
		return INSTANCE;
	}
	
	@Override
	public void afterChargeWithSuccess(Payment payment) {
		super.afterChargeWithSuccess(payment);
		
		Email email = new EmailBuilder()
				.to(payment.getOrder().getUser().getEmail())
				.from("no-answer@gmail.com")
				.subject("Subscription details")
				.body("Congratulations, you subscribe our service with success.")
				.build();
		
		EmailServiceProviderFactory.get(EmailProvider.GMAIL).send(email);
	}

}
