package com.creditas.challange.model.payment;

public interface Visitor<T>{

	void visit(T element);
}
