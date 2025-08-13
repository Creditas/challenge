import order from "./bootstrap";
import { OrderItem } from "./orderItem";
import { CreditCard } from "./payment";

describe("bootstrap", () => {
  it("should order be correctely defined", () => {
    expect(order).toBeDefined();
    expect(order.items).toHaveLength(4);
    expect(order.totalAmount).toEqual(224.9);
    expect(order.closedAt).toBeDefined();

    order.items.forEach((item) => {
      expect(item).toBeInstanceOf(OrderItem);
      expect(item.total).toBeDefined();
      expect(item.quantity).toBeDefined();
      expect(item.product.name).toBeDefined();
      expect(item.product.type).toBeDefined();
      expect(item.product.price).toBeDefined();
    });
  });

  it("should not allow duplicate payment to order", () => {
    expect(() => order.pay(new CreditCard("43567890-987654367"))).toThrow(
      "The order has already been paid!",
    );
  });
});
