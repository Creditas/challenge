package com.creditas.challange.model.domain;

import java.util.ArrayList;
import java.util.List;

public class Shipping {

	private List<ShippingLabel> labels = new ArrayList<ShippingLabel>();
	private ShippingStatus status;

	private Shipping() {
	}

	public static class ShippingBuilder {
		private Shipping shipping = new Shipping();

		public ShippingBuilder label(ShippingLabel label) {
			shipping.labels.add(label);
			return this;
		}

		public Shipping build() {
			shipping.status = ShippingStatus.READY;
			return shipping;
		}
	}

	public List<ShippingLabel> getLabels() {
		return labels;
	}

	public ShippingStatus getStatus() {
		return status;
	}
}
