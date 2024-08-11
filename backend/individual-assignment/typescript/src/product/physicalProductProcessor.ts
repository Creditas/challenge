import { ProductProcessorAfterPurchase } from "./product";

export class PhysicalProductProcessor implements ProductProcessorAfterPurchase {
  /**
   * Method to be implemented
   */
  public process() {
    console.log("Create shipping label");
  }
}
