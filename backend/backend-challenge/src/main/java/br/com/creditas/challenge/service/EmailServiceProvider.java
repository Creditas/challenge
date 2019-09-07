package br.com.creditas.challenge.service;

import java.util.logging.Logger;

import br.com.creditas.challenge.model.Email;
import br.com.creditas.challenge.model.enums.EmailStatus;
import br.com.creditas.challenge.payment.strategy.DigitalPaymentStrategy;

public class EmailServiceProvider {
	
	private static final Logger LOG = Logger.getLogger(DigitalPaymentStrategy.class.getName());
	
	public static EmailStatus send(Email email) {
		// também poderia ser usado uma fila em message brocker (Kafka/RabbitMQ) encarregada pelo envio de e-mails
		try {
			return EmailStatus.SENT;
		} catch (Exception e) {
			LOG.severe("ERROR SENDING EMAIL");
			return EmailStatus.ERROR;
		}
	}

}
