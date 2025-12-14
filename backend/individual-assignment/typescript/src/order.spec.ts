import { Address } from "./address";
import { Customer } from "./customer";
import { Order } from "./order";
import { CreditCard, Payment } from "./payment";
import {
  Product,
  ProductType,
  BookProductProcessor,
  DigitalProductProcessor,
  PhysicalProductProcessor,
  MembershipProductProcessor,
} from "./product";

describe("order", () => {
  let order: Order;

  beforeEach(() => {
    jest.clearAllMocks();
    order = new Order(new Customer("Maria", "maria@gmail.com"), new Address());
  });

  const mockBookProductProcess = jest.fn();
  const mockDigitalProductProcess = jest.fn();
  const mockPhysicalProductProcess = jest.fn();
  const mockMembershipProductProcess = jest.fn();

  jest
    .spyOn(BookProductProcessor.prototype, "process")
    .mockImplementation(mockBookProductProcess);
  jest
    .spyOn(DigitalProductProcessor.prototype, "process")
    .mockImplementation(mockDigitalProductProcess);
  jest
    .spyOn(PhysicalProductProcessor.prototype, "process")
    .mockImplementation(mockPhysicalProductProcess);
  jest
    .spyOn(MembershipProductProcessor.prototype, "process")
    .mockImplementation(mockMembershipProductProcess);

  const shirt = new Product("Basic t-shirt", ProductType.PHYSICAL, 49.9);
  const max = new Product("Standard plan", ProductType.MEMBERSHIP, 29.9);
  const book = new Product(
    "The Hitchhiker's Guide to the Galaxy",
    ProductType.BOOK,
    120.0,
  );
  const music = new Product("Stairway to Heaven", ProductType.DIGITAL, 5.0);
  const card = new CreditCard("43567890-987654367");

  it("should add products to order", () => {
    order.addProduct(shirt, 2);

    expect(order.items).toHaveLength(1);
    expect(order.items[0].product).toEqual(shirt);
    expect(order.items[0].quantity).toEqual(2);

    order.addProduct(max, 1);

    expect(order.items).toHaveLength(2);
    expect(order.items[1].product).toEqual(max);
    expect(order.items[1].quantity).toEqual(1);
    expect(order.totalAmount).toEqual(129.7);

    order.addProduct(music, 1);

    expect(order.items).toHaveLength(3);
    expect(order.items[2].product).toEqual(music);
    expect(order.items[2].quantity).toEqual(1);
    expect(order.totalAmount).toEqual(134.7);

    order.pay(card);

    expect(mockBookProductProcess).not.toHaveBeenCalled();
    expect(mockDigitalProductProcess).toHaveBeenCalled();
    expect(mockPhysicalProductProcess).toHaveBeenCalled();
    expect(mockMembershipProductProcess).toHaveBeenCalled();
  });

  it("should not add the same product twice", () => {
    order.addProduct(book, 2);
    expect(() => order.addProduct(book, 1)).toThrow(
      "The product has already been added. Change the amount if you want more.",
    );
  });

  it("should process payment and close order", () => {
    order.addProduct(shirt, 2);

    expect(order.closedAt).toBeNull();

    order.pay(card);

    expect(order.closedAt).not.toBeNull();
    expect(order.payment).not.toBeNull();
    expect(order.payment).toBeInstanceOf(Payment);
    expect(order.payment?.paidAt).not.toBeNull();
    expect(order.payment?.authorizationNumber).toBeGreaterThan(0);
    expect(order.payment?.amount).toEqual(order.totalAmount);
    expect(order.payment?.invoice.billingAddress).toEqual(order.address);
    expect(order.payment?.invoice.shippingAddress).toEqual(order.address);
  });

  it("should not allow duplicate payments", () => {
    order.addProduct(shirt, 2);
    order.pay(card);
    expect(() => order.pay(card)).toThrow("The order has already been paid!");
  });

  it("should throw error when trying to pay empty order", () => {
    expect(() => order.pay(card)).toThrow("Empty order cannot be paid!");
  });

  it.each`
    product  | mockProcessFunction             | productType
    ${shirt} | ${mockPhysicalProductProcess}   | ${"PHYSICAL"}
    ${max}   | ${mockMembershipProductProcess} | ${"MEMBERSHIP"}
    ${book}  | ${mockBookProductProcess}       | ${"BOOK"}
    ${music} | ${mockDigitalProductProcess}    | ${"DIGITAL"}
  `(
    "should call correct processor when product type is $productType",
    ({ product, mockProcessFunction }) => {
      order.addProduct(product, 1);
      order.pay(card);

      expect(mockProcessFunction).toHaveBeenCalled();
    },
  );
});
