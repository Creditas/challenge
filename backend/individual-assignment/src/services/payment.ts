import Invoice from "./invoice";
import PaymentMethod from "../models/PaymentMethod";
import Order from "./order";

export default class Payment {
  public paidAt: Date;
  public authorizationNumber: number;
  public amount: number;
  public invoice: Invoice;

  constructor(public order: Order, public paymentMethod: PaymentMethod) {
    this.paidAt = new Date();
    this.authorizationNumber = this.paidAt.getTime();
    this.amount = order.totalAmount;
    this.invoice = new Invoice(order);
  }
}