import OrderItem from "../../services/order-item";
import Product, { ProductType } from "../../services/product";
import PhysicalProductPaymentStrategy from "../physical-product-payment.strategy";

const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

describe('PhysicalProductPaymentStrategy', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate a shipping label for a physical product', () => {
    const strategy = new PhysicalProductPaymentStrategy();
    const product = new Product("Camisa 1", ProductType.PHYSICAL, 35.00);
    const orderItem = new OrderItem(product, 2);

    strategy.process(orderItem);

    expect(consoleLogSpy).toHaveBeenCalledWith("Generating shipping label for physical product.");
    expect(consoleLogSpy).toHaveBeenCalledWith(`Shipping Label for ${orderItem.product.name}`);
  });
});
