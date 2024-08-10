import { ProductProcessorAfterPurchase } from "./product";

export class MembershipProductProcessor
  implements ProductProcessorAfterPurchase
{
  public process() {
    console.log("Activate the subscription");
    console.log("Notify the user via email about the subscription");
  }
}
