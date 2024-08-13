import PaymentMethod from "../../models/PaymentMethod";
import BookPaymentStrategy from "../../strategies/book-payment.strategy";
import DigitalProductPaymentStrategy from "../../strategies/digital-product-payment.strategy";
import MembershipPaymentStrategy from "../../strategies/membership-payment-strategy";
import PhysicalProductPaymentStrategy from "../../strategies/physical-product-payment.strategy";
import Address from "../address";
import Customer from "../customer";
import Order from "../order";
import OrderItem from "../order-item";
import Product, { ProductType } from "../product";
import { ERROR_MESSAGES } from "../utils";

describe('Order', () => {
  let order: Order;
  let customer: Customer;
  let address: Address;
  let paymentMethod: PaymentMethod;
  let book: Product;
  let digitalProduct: Product;
  let membership: Product;
  let physicalProduct: Product;

  beforeEach(() => {
    customer = new Customer();
    address = new Address();
    paymentMethod = {} as PaymentMethod;

    book = new Product('Livro 1', ProductType.BOOK, 100);
    digitalProduct = new Product('Música 1', ProductType.DIGITAL, 50);
    membership = new Product('Familiar plan', ProductType.MEMBERSHIP, 150);
    physicalProduct = new Product('Camisa 1', ProductType.PHYSICAL, 200);

    order = new Order(customer, address);
  });

  it('should add products to the order', () => {
    order.addProduct(book, 1);
    order.addProduct(digitalProduct, 2);

    expect(order.items.length).toBe(2);
    expect(order.totalAmount).toBe(200);
  });

  it('should increase quantity if product is already in the order', () => {
    order.addProduct(book, 1);
    order.addProduct(book, 2);

    expect(order.items.length).toBe(1);
    expect(order.items[0].quantity).toBe(3);
  });

  it('should process payment with correct strategies', () => {
    const bookStrategy = jest.spyOn(BookPaymentStrategy.prototype, 'process');
    const digitalProductStrategy = jest.spyOn(DigitalProductPaymentStrategy.prototype, 'process');
    const membershipStrategy = jest.spyOn(MembershipPaymentStrategy.prototype, 'process');
    const physicalProductStrategy = jest.spyOn(PhysicalProductPaymentStrategy.prototype, 'process');

    order.addProduct(book, 1);
    order.addProduct(digitalProduct, 1);
    order.addProduct(membership, 1);
    order.addProduct(physicalProduct, 1);

    order.pay(paymentMethod);

    expect(bookStrategy).toHaveBeenCalledWith(expect.any(OrderItem));
    expect(digitalProductStrategy).toHaveBeenCalledWith(expect.any(OrderItem));
    expect(membershipStrategy).toHaveBeenCalledWith(expect.any(OrderItem));
    expect(physicalProductStrategy).toHaveBeenCalledWith(expect.any(OrderItem));
  });

  it('should throw an error if payment is attempted on an empty order', () => {
    expect(() => order.pay(paymentMethod)).toThrow(ERROR_MESSAGES.EMPTY_ORDER);
  });

  it('should throw an error if trying to pay an order that has already been paid', () => {
    order.addProduct(book, 1);
    order.pay(paymentMethod);

    expect(() => order.pay(paymentMethod)).toThrow(ERROR_MESSAGES.ORDER_ALREADY_PAID);
  });

  it('should throw an error if a product type has no associated payment strategy', () => {
    const unknownProduct = new Product('Unknown Item', 'UNKNOWN_TYPE' as ProductType, 300);

    order.addProduct(unknownProduct, 1);

    expect(() => order.pay(paymentMethod)).toThrow(ERROR_MESSAGES.NO_PAYMENT_STRATEGY);
  });
});
