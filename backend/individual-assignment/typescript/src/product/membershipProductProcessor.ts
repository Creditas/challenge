import { ProductProcessorAfterPurchase } from "./product";

export class MembershipProductProcessor
  implements ProductProcessorAfterPurchase
{
  /**
   * Method to be implemented
   */
  public process() {
    console.log("Activate the subscription");
    console.log("Notify the user via email about the subscription");
  }
}
