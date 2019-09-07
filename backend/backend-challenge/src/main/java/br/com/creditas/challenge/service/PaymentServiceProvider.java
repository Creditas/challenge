package br.com.creditas.challenge.service;

import br.com.creditas.challenge.model.Payment;
import br.com.creditas.challenge.model.enums.PaymentStatus;

public class PaymentServiceProvider {

	public static PaymentStatus process(Payment payment) {
		// TODO logica para transação com cartão de crédito
		return PaymentStatus.APPROVED;
	}
	
}
