import { ProductProcessorAfterPurchase } from "./product";

export class BookProductProcessor implements ProductProcessorAfterPurchase {
  public process() {
    console.log(
      "Create shipping label with notification that it is a tax-exempt item as provided in the Constitution Art. 150, VI, d.",
    );
  }
}
