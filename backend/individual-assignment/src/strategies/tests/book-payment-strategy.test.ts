import OrderItem from "../../services/order-item";
import Product, { ProductType } from "../../services/product";
import BookPaymentStrategy from "../book-payment.strategy";


const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

describe('BookPaymentStrategy', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate a tax-exempt shipping label for a book', () => {
    const strategy = new BookPaymentStrategy();
    const product = new Product("Livro 1", ProductType.BOOK, 120.00);
    const orderItem = new OrderItem(product, 1);

    strategy.process(orderItem);

    expect(consoleLogSpy).toHaveBeenCalledWith("Generating shipping label for book.");
    expect(consoleLogSpy).toHaveBeenCalledWith(`Tax-Exempt Shipping Label for ${orderItem.product.name}`);
  });
});
