package br.com.creditas.challenge.payment.strategy;

import java.util.logging.Logger;

import br.com.creditas.challenge.model.Payment;
import br.com.creditas.challenge.model.Shipping.ShippingBuilder;
import br.com.creditas.challenge.model.enums.ShippingLabel;

public class PhysicalPaymentStrategy extends AbstractPaymentStrategy {

	private static final Logger LOG = Logger.getLogger(PhysicalPaymentStrategy.class.getName());
	
	@Override
	public void afterSuccessfullyProcessing(Payment payment) {
		LOG.info("AFTER PROCESSING PHYSICAL PAYMENT");
		super.afterSuccessfullyProcessing(payment);

		payment.getOrder().setShipping(new ShippingBuilder().label(ShippingLabel.BOXED).build());
	}

}
