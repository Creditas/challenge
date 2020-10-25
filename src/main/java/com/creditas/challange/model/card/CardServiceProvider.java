package com.creditas.challange.model.card;

import com.creditas.challange.model.domain.Payment;
import com.creditas.challange.model.domain.PaymentStatus;

public interface CardServiceProvider {
	
	PaymentStatus process(Payment payment);

}
