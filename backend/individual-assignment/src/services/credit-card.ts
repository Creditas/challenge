import PaymentMethod from "../models/PaymentMethod";

export default class CreditCard implements PaymentMethod {
  constructor(public number: string) { }
}