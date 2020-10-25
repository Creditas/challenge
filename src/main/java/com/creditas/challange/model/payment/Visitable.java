package com.creditas.challange.model.payment;

public interface Visitable<T> {

	void accept(Visitor<T> visitor);
}
