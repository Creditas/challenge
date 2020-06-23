package br.com.creditas.challenge;

import static org.junit.Assert.assertEquals;

import java.math.BigDecimal;

import org.junit.Before;
import org.junit.Test;

import br.com.creditas.challenge.model.Order;
import br.com.creditas.challenge.model.Payment;
import br.com.creditas.challenge.model.Product;
import br.com.creditas.challenge.model.User;
import br.com.creditas.challenge.model.enums.PaymentStatus;
import br.com.creditas.challenge.model.enums.ProductType;
import br.com.creditas.challenge.payment.PaymentListener;

public class PaymentTest {
	PaymentListener listener;
	Payment payment;
	
	@Before
	public void setup(){
		listener = new PaymentListener();
	}

	@Test
	public void musMakeDigitalPayment() {
		Payment payment = getPayment(ProductType.DIGITAL);
		PaymentStatus paymentStatus = listener.receiveMessage(payment);
		assertEquals(paymentStatus, PaymentStatus.APPROVED);
	}
	
	@Test
	public void musMakeBookPayment() {
		Payment payment = getPayment(ProductType.BOOK);
		PaymentStatus paymentStatus = listener.receiveMessage(payment);
		assertEquals(paymentStatus, PaymentStatus.APPROVED);
	}
	
	private Payment getPayment(ProductType type) {
		Payment payment = new Payment();
		
		payment.setOrder(getOrder(type));
		payment.setStatus(PaymentStatus.WAITING);
		
		return payment;
	}

	private Order getOrder(ProductType type) {
		Order order = new Order();		
		order.setProduct(getProduct(type));
		order.setTotal(new BigDecimal(20.0));
		order.setUser(getUser());
		return order;
	}

	private User getUser() {
		User user = new User();
		user.setEmail("email@email.com");
		user.setName("User Creditas");
		user.setPassword("password");
		user.setUsername("username");
		return user;
	}

	private Product getProduct(ProductType type) {
		Product product = new Product();
		product.setPrice(new BigDecimal(20.0));
		product.setType(type);
		return product;
	}

}
