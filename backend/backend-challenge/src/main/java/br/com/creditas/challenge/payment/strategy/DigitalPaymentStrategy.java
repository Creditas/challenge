package br.com.creditas.challenge.payment.strategy;

import java.math.BigDecimal;
import java.util.logging.Logger;

import br.com.creditas.challenge.model.Email;
import br.com.creditas.challenge.model.Payment;
import br.com.creditas.challenge.service.EmailServiceProvider;

public class DigitalPaymentStrategy extends AbstractPaymentStrategy {

	private static final Logger LOG = Logger.getLogger(DigitalPaymentStrategy.class.getName());
	
	@Override
	public boolean beforeProcess(Payment payment) {
		LOG.info("BEFORE PROCESSING DIGITAL PAYMENT");
		payment.getOrder().setDiscount(BigDecimal.TEN);
		return super.beforeProcess(payment);
	}

	@Override
	public void afterSuccessfullyProcessing(Payment payment) {
		LOG.info("AFTER PROCESSING DIGITAL PAYMENT");
		super.afterSuccessfullyProcessing(payment);
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
