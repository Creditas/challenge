import Address from "./services/address";
import CreditCard from "./services/credit-card";
import Customer from "./services/customer";
import Order from "./services/order";
import Product, { ProductType } from "./services/product";

const shirt = new Product("Flowered t-shirt", ProductType.PHYSICAL, 35.00);
const netflix = new Product("Familiar plan", ProductType.MEMBERSHIP, 29.90);
const book = new Product("The Hitchhiker's Guide to the Galaxy", ProductType.BOOK, 120.00);
const music = new Product("Stairway to Heaven", ProductType.DIGITAL, 5.00);

const order = new Order(new Customer(), new Address());

order.addProduct(shirt, 2);
order.addProduct(netflix, 1);
order.addProduct(book, 1);
order.addProduct(music, 1);

order.pay(new CreditCard("43567890-987654367"));