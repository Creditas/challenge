import { Address } from "./address";
import { Customer } from "./customer";
import { Order } from "./order";
import { CreditCard, Payment } from "./payment";
import { Product, ProductType } from "./product/product";

describe("order", () => {
  let order: Order;
  const consoleLogSpy = jest.spyOn(console, "log");

  beforeEach(() => {
    jest.clearAllMocks();
    order = new Order(new Customer("Maria", "maria@gmail.com"), new Address());
  });

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

  it("should call console.log with correct value when product type is PHYSICAL", () => {
    order.addProduct(shirt, 1);
    order.pay(card);

    expect(consoleLogSpy).toHaveBeenCalledWith("Create shipping label");
  });

  it("should call console.log with correct value when product type is MEMBERSHIP", () => {
    order.addProduct(max, 1);
    order.pay(card);

    expect(consoleLogSpy).toHaveBeenCalledWith("Activate the subscription");
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Notify the user via email about the subscription",
    );
  });

  it("should call console.log with correct value when product type is BOOK", () => {
    order.addProduct(book, 1);
    order.pay(card);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Create shipping label with notification that it is a tax-exempt item as provided in the Constitution Art. 150, VI, d.",
    );
  });

  it("should call console.log with correct value when product type is DIGITAL", () => {
    order.addProduct(music, 1);
    order.pay(card);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Send the purchase description by email to the customer",
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Grant a R$10 discount voucher to the customer Maria associated with the payment",
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Sendind email to maria@gmail.com from defaultEmail@gmail.com. Subject: Purchase Description. Body: Default Purchase Description",
    );
  });
});
