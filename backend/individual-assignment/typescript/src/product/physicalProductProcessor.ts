import { ProductProcessorAfterPurchase } from "./product";

export class PhysicalProductProcessor implements ProductProcessorAfterPurchase {
  public process() {
    console.log("Create shipping label");
  }
}
