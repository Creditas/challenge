import Address from "./address";
import Order from "./order";

export default class Invoice {
  public billingAddress: Address;
  public shippingAddress: Address;

  constructor(public order: Order) {
    this.billingAddress = order.address;
    this.shippingAddress = order.address;
  }
}