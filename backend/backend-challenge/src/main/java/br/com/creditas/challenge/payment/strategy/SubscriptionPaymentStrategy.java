package br.com.creditas.challenge.payment.strategy;

import java.util.logging.Logger;

import br.com.creditas.challenge.model.Email;
import br.com.creditas.challenge.model.Payment;
import br.com.creditas.challenge.service.EmailServiceProvider;

public class SubscriptionPaymentStrategy extends AbstractPaymentStrategy {
	
	private static final Logger LOG = Logger.getLogger(DigitalPaymentStrategy.class.getName());

	@Override
	public void afterSuccessfullyProcessing(Payment payment) {
		LOG.info("AFTER PROCESSING SUBSCRIPTION PAYMENT");
		super.afterSuccessfullyProcessing(payment);
		this.enableSubscription(payment);
		
	}
	
	private void enableSubscription(Payment payment) {
		LOG.info("ENABLE SUBSCRIPTION");
		//TODO Implementação da ativação da assinatura
		
		EmailServiceProvider.send(setupEmail(payment));
	}

	private Email setupEmail(Payment payment) {
		Email email = new Email();
		email.setTo(payment.getOrder().getUser().getEmail());
		email.setFrom("email@email.com");
		email.setSubject("Payment detail");
		email.setBody("bla bla bla");
		return email;
	}

}
