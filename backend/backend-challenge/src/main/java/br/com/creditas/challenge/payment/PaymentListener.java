package br.com.creditas.challenge.payment;

import br.com.creditas.challenge.model.Payment;
import br.com.creditas.challenge.model.enums.PaymentStatus;
import br.com.creditas.challenge.payment.PaymentContext.PaymentContextBuilder;

public class PaymentListener {

	// recebe mensagem de um brocker (Kafka/RabbitMQ)
	public PaymentStatus receiveMessage(Payment payment) {
		PaymentContext context = new PaymentContextBuilder().payment(payment).build();
		context.start();
		context.validate();
		context.process();
		return context.proceed();
	}
	
}
