"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = require("./models/Order");
const Customer_1 = require("./models/Customer");
const Address_1 = require("./models/Address");
const Product_1 = require("./models/Product");
const OrderProcessor_1 = require("./OrderProcessor");
const DigitalProductPayment_1 = require("./strategies/DigitalProductPayment");
const PhysicalProductShipping_1 = require("./strategies/PhysicalProductShipping");
const BookShipping_1 = require("./strategies/BookShipping");
const MembershipActivationShipping_1 = require("./strategies/MembershipActivationShipping");
const NoShipping_1 = require("./strategies/NoShipping");
const DigitalReceiptSender_1 = require("./strategies/DigitalReceiptSender");
const DigitalDiscountVoucherApplier_1 = require("./strategies/DigitalDiscountVoucherApplier");
// Exemplo de uso
const shirt = new Product_1.Product("Flowered t-shirt", Product_1.ProductType.PHYSICAL, 35.00);
const netflix = new Product_1.Product("Familiar plan", Product_1.ProductType.MEMBERSHIP, 29.90);
const book = new Product_1.Product("The Hitchhiker's Guide to the Galaxy", Product_1.ProductType.BOOK, 120.00);
const music = new Product_1.Product("Stairway to Heaven", Product_1.ProductType.DIGITAL, 5.00);
// Pedido de Produto Físico
const order1 = new Order_1.Order(new Customer_1.Customer(), new Address_1.Address());
order1.addProduct(shirt, 2);
const physicalPaymentStrategy = new DigitalProductPayment_1.DigitalProductPayment(new DigitalReceiptSender_1.DigitalReceiptSender(), new DigitalDiscountVoucherApplier_1.DigitalDiscountVoucherApplier());
const physicalShippingStrategy = new PhysicalProductShipping_1.PhysicalProductShipping();
const orderProcessor1 = new OrderProcessor_1.OrderProcessor(physicalShippingStrategy, physicalPaymentStrategy);
orderProcessor1.processOrder(order1);
// Pedido de Assinatura de Serviço
const order2 = new Order_1.Order(new Customer_1.Customer(), new Address_1.Address());
order2.addProduct(netflix, 1);
const membershipPaymentStrategy = new DigitalProductPayment_1.DigitalProductPayment(new DigitalReceiptSender_1.DigitalReceiptSender(), new DigitalDiscountVoucherApplier_1.DigitalDiscountVoucherApplier());
const membershipShippingStrategy = new MembershipActivationShipping_1.MembershipActivationShipping();
const orderProcessor2 = new OrderProcessor_1.OrderProcessor(membershipShippingStrategy, membershipPaymentStrategy);
orderProcessor2.processOrder(order2);
// Pedido de Livro
const order3 = new Order_1.Order(new Customer_1.Customer(), new Address_1.Address());
order3.addProduct(book, 1);
const bookPaymentStrategy = new DigitalProductPayment_1.DigitalProductPayment(new DigitalReceiptSender_1.DigitalReceiptSender(), new DigitalDiscountVoucherApplier_1.DigitalDiscountVoucherApplier());
const bookShippingStrategy = new BookShipping_1.BookShipping();
const orderProcessor3 = new OrderProcessor_1.OrderProcessor(bookShippingStrategy, bookPaymentStrategy);
orderProcessor3.processOrder(order3);
// Pedido de Mídia Digital
const order4 = new Order_1.Order(new Customer_1.Customer(), new Address_1.Address());
order4.addProduct(music, 1);
const digitalPaymentStrategy = new DigitalProductPayment_1.DigitalProductPayment(new DigitalReceiptSender_1.DigitalReceiptSender(), new DigitalDiscountVoucherApplier_1.DigitalDiscountVoucherApplier());
const orderProcessor4 = new OrderProcessor_1.OrderProcessor(new NoShipping_1.NoShipping(), digitalPaymentStrategy);
orderProcessor4.processOrder(order4);
