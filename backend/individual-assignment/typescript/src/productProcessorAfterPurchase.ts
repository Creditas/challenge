export interface ProductProcessorAfterPurchase {
  process(): void;
}

export class PhysicalProductProcessor implements ProductProcessorAfterPurchase {
  public process() {
    console.log("Create shipping label");
  }
}

export class MembershipProductProcessor
  implements ProductProcessorAfterPurchase
{
  public process() {
    console.log("Activate the subscription");
    console.log("Notify the user via email about the subscription");
  }
}

export class BookProductProcessor implements ProductProcessorAfterPurchase {
  public process() {
    console.log(
      "Create shipping label with notification that it is a tax-exempt item as provided in the Constitution Art. 150, VI, d.",
    );
  }
}

export class DigitalProductProcessor implements ProductProcessorAfterPurchase {
  public process() {
    console.log("Send the purchase description by email to the customer");
    console.log(
      "Grant a R$10 discount voucher to the buyer associated with the payment",
    );
  }
}
