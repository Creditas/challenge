package com.creditas.challange.model.payment;

import com.creditas.challange.model.domain.Payment;

public interface PaymentStrategy {

	void start(Payment payment);
	boolean validate(Payment payment);
	void process(Payment payment);
	void proceed(Payment payment);
	
}
