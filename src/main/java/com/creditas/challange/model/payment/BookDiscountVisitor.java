package com.creditas.challange.model.payment;

import java.math.BigDecimal;

import com.creditas.challange.model.domain.Order;

public class BookDiscountVisitor implements Visitor<Order>{

	public void visit(Order order) {
		order.setFees(BigDecimal.ZERO);
	}

}
