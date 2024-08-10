import { Address } from "./address";
import { Customer } from "./customer";
import { Order } from "./order";
import { CreditCard } from "./payment";
import { Product, ProductType } from "./product";

// Exemplo de uso
const shirt = new Product("Flowered t-shirt", ProductType.PHYSICAL, 35.0);
const netflix = new Product("Familiar plan", ProductType.MEMBERSHIP, 29.9);
const book = new Product(
  "The Hitchhiker's Guide to the Galaxy",
  ProductType.BOOK,
  120.0,
);
const music = new Product("Stairway to Heaven", ProductType.DIGITAL, 5.0);

const order = new Order(new Customer(), new Address());

order.addProduct(shirt, 2);
order.addProduct(netflix, 1);
order.addProduct(book, 1);
order.addProduct(music, 1);

order.pay(new CreditCard("43567890-987654367"));

export default order; // to test this case
// now, how to deal with shipping rules then?
