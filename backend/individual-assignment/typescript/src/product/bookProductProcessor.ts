import { ProductProcessorAfterPurchase } from "./product";

/**
 * Service to be created and moved to specific file
 */
class ShippingLabelService {}

export class BookProductProcessor implements ProductProcessorAfterPurchase {
  constructor(private shippingLabelService: ShippingLabelService) {}
  /**
   * Method to be implemented
   */
  public process() {
    console.log(
      "Create shipping label with notification that it is a tax-exempt item as provided in the Constitution Art. 150, VI, d.",
    );
  }
}
