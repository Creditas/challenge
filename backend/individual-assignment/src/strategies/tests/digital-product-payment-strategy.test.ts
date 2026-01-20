import OrderItem from "../../services/order-item";
import Product, { ProductType } from "../../services/product";
import DigitalProductPaymentStrategy from "../digital-product-payment.strategy";


const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

describe('DigitalProductPaymentStrategy', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send purchase description and generate a discount voucher for digital products', () => {
    const strategy = new DigitalProductPaymentStrategy();
    const product = new Product("Música 1", ProductType.DIGITAL, 5.00);
    const orderItem = new OrderItem(product, 1);

    strategy.process(orderItem);

    expect(consoleLogSpy).toHaveBeenCalledWith("Sending purchase description for the user email.");
    expect(consoleLogSpy).toHaveBeenCalledWith("Generating discount voucher.");
    expect(consoleLogSpy).toHaveBeenCalledWith(`Email sent to user with purchase description for ${orderItem.product.name}.`);
    expect(consoleLogSpy).toHaveBeenCalledWith(`$10 discount voucher generated for ${orderItem.product.name}.`);
  });
});
