package br.com.creditas.challenge.model;

import java.util.ArrayList;
import java.util.List;

import br.com.creditas.challenge.model.enums.ShippingLabel;
import br.com.creditas.challenge.model.enums.ShippingStatus;

public class Shipping {

	private List<ShippingLabel> labels = new ArrayList<ShippingLabel>();
	private ShippingStatus status;
	
	public List<ShippingLabel> getLabels() {
		return labels;
	}
	public void setLabels(List<ShippingLabel> labels) {
		this.labels = labels;
	}
	public ShippingStatus getStatus() {
		return status;
	}
	public void setStatus(ShippingStatus status) {
		this.status = status;
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
	
}
