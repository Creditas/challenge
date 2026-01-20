import OrderItem from "../../services/order-item";
import Product, { ProductType } from "../../services/product";
import MembershipPaymentStrategy from "../membership-payment-strategy";


const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

describe('MembershipPaymentStrategy', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should activate membership and send notification email', () => {
    const strategy = new MembershipPaymentStrategy();
    const product = new Product("Familiar plan", ProductType.MEMBERSHIP, 29.90);
    const orderItem = new OrderItem(product, 1);

    strategy.process(orderItem);

    expect(consoleLogSpy).toHaveBeenCalledWith("Activating membership");
    expect(consoleLogSpy).toHaveBeenCalledWith("Sending notification email.");
    expect(consoleLogSpy).toHaveBeenCalledWith(`Membership for ${orderItem.product.name} activated.`);
    expect(consoleLogSpy).toHaveBeenCalledWith(`Email sent to user for membership activation.`);
  });
});
