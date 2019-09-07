package br.com.creditas.challenge.payment.strategy;

import br.com.creditas.challenge.model.Payment;
import br.com.creditas.challenge.model.enums.PaymentStatus;

public interface PaymentStrategy {

	void start(Payment payment);
	boolean validate(Payment payment);
	void process(Payment payment);
	PaymentStatus proceed(Payment payment);

}
