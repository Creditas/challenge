package com.creditas.challange.model.payment;

import com.creditas.challange.model.card.CardServiceProviderFactory;
import com.creditas.challange.model.domain.OrderStatus;
import com.creditas.challange.model.domain.Payment;
import com.creditas.challange.model.domain.PaymentStatus;

public abstract class AbstractPaymentStrategy implements PaymentStrategy {

	public void start(Payment payment) {
		payment.setStatus(PaymentStatus.PROCESSING);
	}

	public boolean validate(Payment payment) {
		payment.setStatus(PaymentStatus.VALIDATED);
		return true;
	}

	public boolean beforeProcess(Payment payment) {
		return true;
	}

	public void process(Payment payment) {
		if (beforeProcess(payment)) {
			
			// calc total
			payment.getOrder().accept(new OrderCalcTotalVisitor());
			
			// transact with card provider
			PaymentStatus status = CardServiceProviderFactory.get(payment.getType()).process(payment);
			payment.setStatus(status);
			
			if(PaymentStatus.APPROVED == status) {
				afterChargeWithSuccess(payment);
			}
		}
		afterProcess(payment);
	}

	public void afterChargeWithSuccess(Payment payment) {};
	public void afterProcess(Payment payment) {};

	public void proceed(Payment payment) {
		if (PaymentStatus.APPROVED == payment.getStatus()) {
			payment.getOrder().setStatus(OrderStatus.CHARGED);
		} else {
			payment.getOrder().setStatus(OrderStatus.CHARGING_NOT_AUTHORIZED);
		}
		
		// TODO - produces a message to the broker, so the next step (shipping) of the chain/flow could be processed
	}
}
