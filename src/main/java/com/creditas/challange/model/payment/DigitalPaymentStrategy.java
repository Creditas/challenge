package com.creditas.challange.model.payment;

import com.creditas.challange.model.domain.Email;
import com.creditas.challange.model.domain.Email.EmailBuilder;
import com.creditas.challange.model.domain.Payment;
import com.creditas.challange.model.email.EmailProvider;
import com.creditas.challange.model.email.EmailServiceProviderFactory;

public class DigitalPaymentStrategy extends AbstractPaymentStrategy {

	private static final DigitalPaymentStrategy INSTANCE = new DigitalPaymentStrategy();

	private DigitalPaymentStrategy() {
	}

	public static DigitalPaymentStrategy getInstance() {
		return INSTANCE;
	}
	
	@Override
	public boolean beforeProcess(Payment payment) {
		payment.getOrder().accept(new DigitalMediaDiscountVisitor());
		return super.beforeProcess(payment);
	}
	
	@Override
	public void afterChargeWithSuccess(Payment payment) {
		super.afterChargeWithSuccess(payment);
		
		Email email = new EmailBuilder()
				.to(payment.getOrder().getUser().getEmail())
				.from("no-answer@gmail.com")
				.subject("Digital media details")
				.body("Congratulations, you bought our digital media with success.")
				.build();
		
		EmailServiceProviderFactory.get(EmailProvider.GMAIL).send(email);
	}
}
