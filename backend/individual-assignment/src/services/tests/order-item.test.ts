import OrderItem from "../order-item";
import Product, { ProductType } from "../product";
import { ERROR_MESSAGES } from "../utils";


describe('OrderItem', () => {
  let product: Product;
  let orderItem: OrderItem;

  beforeEach(() => {
    product = new Product('Camisa 1', ProductType.PHYSICAL, 50);
    orderItem = new OrderItem(product, 2);
  });

  it('should calculate the total correctly', () => {
    expect(orderItem.total).toBe(100);
  });

  it('should add quantity correctly', () => {
    orderItem.addQuantity(3);
    expect(orderItem.quantity).toBe(5);
  });

  it('should throw an error if the quantity to add is less than or equal to zero', () => {
    expect(() => orderItem.addQuantity(0)).toThrow(ERROR_MESSAGES.QUANTITY_GREATER_THAN_ZERO);
    expect(() => orderItem.addQuantity(-5)).toThrow(ERROR_MESSAGES.QUANTITY_GREATER_THAN_ZERO);
  });
});
