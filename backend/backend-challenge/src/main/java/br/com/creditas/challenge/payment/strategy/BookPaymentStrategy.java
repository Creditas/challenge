package br.com.creditas.challenge.payment.strategy;

import java.math.BigDecimal;
import java.util.logging.Logger;

import br.com.creditas.challenge.model.Payment;
import br.com.creditas.challenge.model.Shipping.ShippingBuilder;
import br.com.creditas.challenge.model.enums.ShippingLabel;

public class BookPaymentStrategy extends AbstractPaymentStrategy {

	private static final Logger LOG = Logger.getLogger(BookPaymentStrategy.class.getName());
	
	@Override
	public boolean beforeProcess(Payment payment) {
		LOG.info("BEFORE PROCESSING BOOK PAYMENT");
		payment.getOrder().setDiscount(BigDecimal.ZERO);
		return super.beforeProcess(payment);
	}

	@Override
	public void afterSuccessfullyProcessing(Payment payment) {
		LOG.info("AFTER PROCESSING BOOK PAYMENT");
		super.afterSuccessfullyProcessing(payment);

		payment.getOrder().setShipping(new ShippingBuilder()
			.label(ShippingLabel.FREE)
			.label(ShippingLabel.BOXED).build());
	}
}
