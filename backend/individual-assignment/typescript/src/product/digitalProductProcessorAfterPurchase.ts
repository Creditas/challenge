import { Order } from "../order";
import { Customer } from "../customer";
import { EmailProviderService } from "../emailProviderService";
import { ProductProcessorAfterPurchase } from "./product";

export class DigitalProductProcessor implements ProductProcessorAfterPurchase {
  constructor(private emailProvider: EmailProviderService) {}
  public process(order: Order) {
    this.sendEmail(order.customer, order.description);
    this.createDiscountVoucher(order.customer);
  }

  private sendEmail(customer: Customer, description: string | null) {
    console.log("Send the purchase description by email to the customer");
    this.emailProvider.send(
      customer.email,
      "Purchase Description",
      description ?? "Default Purchase Description",
    );
  }

  private createDiscountVoucher(customer: Customer) {
    console.log(
      `Grant a R$10 discount voucher to the customer ${customer.name} associated with the payment`,
    );
  }
}
