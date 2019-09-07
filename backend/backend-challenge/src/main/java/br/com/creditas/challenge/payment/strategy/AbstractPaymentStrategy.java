package br.com.creditas.challenge.payment.strategy;

import java.util.logging.Logger;

import br.com.creditas.challenge.model.Order;
import br.com.creditas.challenge.model.Payment;
import br.com.creditas.challenge.model.enums.OrderStatus;
import br.com.creditas.challenge.model.enums.PaymentStatus;
import br.com.creditas.challenge.service.PaymentServiceProvider;

public class AbstractPaymentStrategy implements PaymentStrategy {
	
	private static final Logger LOG = Logger.getLogger(AbstractPaymentStrategy.class.getName());

	public void start(Payment payment) {
		LOG.info("STARTING PAYMENT");
		payment.setStatus(PaymentStatus.WAITING);
	}

	public boolean validate(Payment payment) {
		LOG.info("VALIDATING PAYMENT");
		payment.setStatus(PaymentStatus.VALIDATED);
		return true;
	}

	public boolean beforeProcess(Payment payment) {
		return true;
	}
	
	public void process(Payment payment) {
		LOG.info("PROCESSING PAYMENT");
		if (beforeProcess(payment)) {
			payment.setStatus(PaymentStatus.PROCESSING);
			
			calculateTotalOrderPrice(payment);
			
			PaymentStatus status = PaymentServiceProvider.process(payment);
			payment.setStatus(status);

			if(PaymentStatus.APPROVED == status) {
				LOG.info("PAYMENT APPROVED");
				afterSuccessfullyProcessing(payment);
			}
		}
		afterProcess(payment);
	}
	
	private void calculateTotalOrderPrice(Payment payment) {
		LOG.info("CALCULATE TOTAL ORDER PRICE");
		Order order = payment.getOrder();
		order.setTotal(order.getTotal().subtract(order.getDiscount()));
		payment.setOrder(order);
		LOG.info("TOTAL ORDER PRICE: " + order.getTotal());
	}

	public void afterSuccessfullyProcessing(Payment payment) {};
	
	public void afterProcess(Payment payment) {};
	
	public PaymentStatus proceed(Payment payment) {
		LOG.info("PROCEEDING PAYMENT");
		if (PaymentStatus.APPROVED == payment.getStatus()) {
			payment.getOrder().setStatus(OrderStatus.PROCESSED);
		} else {
			payment.getOrder().setStatus(OrderStatus.NOT_AUTHORIZED);
		}

		// TODO - prodizir mensagem para message brocker (Kafka/RabbitMQ) para executar próxima etapa (shipping)
		return PaymentStatus.APPROVED;
	}
}
