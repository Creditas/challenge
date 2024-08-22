import { Order } from './models/Order';
import { Customer } from './models/Customer';
import { Address } from './models/Address';
import { Product, ProductType } from './models/Product';
import { OrderProcessor } from './OrderProcessor';
import { DigitalProductPayment } from './strategies/DigitalProductPayment';
import { PhysicalProductShipping } from './strategies/PhysicalProductShipping';
import { BookShipping } from './strategies/BookShipping';
import { MembershipActivationShipping } from './strategies/MembershipActivationShipping';
import { NoShipping } from './strategies/NoShipping';
import { DigitalReceiptSender } from './strategies/DigitalReceiptSender';
import { DigitalDiscountVoucherApplier } from './strategies/DigitalDiscountVoucherApplier';

// Exemplo de uso

const shirt = new Product("Flowered t-shirt", ProductType.PHYSICAL, 35.00);
const netflix = new Product("Familiar plan", ProductType.MEMBERSHIP, 29.90);
const book = new Product("The Hitchhiker's Guide to the Galaxy", ProductType.BOOK, 120.00);
const music = new Product("Stairway to Heaven", ProductType.DIGITAL, 5.00);

// Pedido de Produto Físico
const order1 = new Order(new Customer(), new Address());
order1.addProduct(shirt, 2);

const physicalPaymentStrategy = new DigitalProductPayment(
    new DigitalReceiptSender(),
    new DigitalDiscountVoucherApplier()
);
const physicalShippingStrategy = new PhysicalProductShipping();

const orderProcessor1 = new OrderProcessor(physicalShippingStrategy, physicalPaymentStrategy);
orderProcessor1.processOrder(order1);

// Pedido de Assinatura de Serviço
const order2 = new Order(new Customer(), new Address());
order2.addProduct(netflix, 1);

const membershipPaymentStrategy = new DigitalProductPayment(
    new DigitalReceiptSender(),
    new DigitalDiscountVoucherApplier()
);
const membershipShippingStrategy = new MembershipActivationShipping();

const orderProcessor2 = new OrderProcessor(membershipShippingStrategy, membershipPaymentStrategy);
orderProcessor2.processOrder(order2);

// Pedido de Livro
const order3 = new Order(new Customer(), new Address());
order3.addProduct(book, 1);

const bookPaymentStrategy = new DigitalProductPayment(
    new DigitalReceiptSender(),
    new DigitalDiscountVoucherApplier()
);
const bookShippingStrategy = new BookShipping();

const orderProcessor3 = new OrderProcessor(bookShippingStrategy, bookPaymentStrategy);
orderProcessor3.processOrder(order3);

// Pedido de Mídia Digital
const order4 = new Order(new Customer(), new Address());
order4.addProduct(music, 1);

const digitalPaymentStrategy = new DigitalProductPayment(
    new DigitalReceiptSender(),
    new DigitalDiscountVoucherApplier()
);
const orderProcessor4 = new OrderProcessor(new NoShipping(), digitalPaymentStrategy);
orderProcessor4.processOrder(order4);
