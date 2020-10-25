package com.creditas.challange.model.payment;

import com.creditas.challange.model.domain.Order;

public class OrderCalcTotalVisitor implements Visitor<Order> {

	public void visit(Order order) {
		order.setTotal(order.getTotal().subtract(order.getDiscount()).add(order.getFees()));
	}

}
