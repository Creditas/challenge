class Order {
    public items: OrderItem[] = [];
    public closedAt: Date | null = null;
    public payment: Payment | null = null;

    constructor(public customer: Customer, public address: Address) {}

    get totalAmount(): number {
        return this.items.reduce((sum, item) => sum + item.total, 0);
    }

    addProduct(product: Product, quantity: number): void {
        const productAlreadyAdded = this.items.some(item => item.product === product);
        if (productAlreadyAdded) {
            throw new Error("The product has already been added. Change the amount if you want more.");
        }

        this.items.push(new OrderItem(product, quantity));
    }

    pay(method: PaymentMethod): void {
        if (this.payment) {
            throw new Error("The order has already been paid!");
        }

        if (this.items.length === 0) {
            throw new Error("Empty order cannot be paid!");
        }

        this.payment = new Payment(this, method);
        this.close();
    }

    public close(): void {
        this.closedAt = new Date();
    }
}

class OrderItem {
    constructor(public product: Product, public quantity: number) {}

    get total(): number {
        return this.product.price * this.quantity;
    }
}

class Payment {
    public paidAt: Date;
    public authorizationNumber: number;
    public amount: number;
    public invoice: Invoice;

    constructor(public order: Order, public paymentMethod: PaymentMethod) {
        this.paidAt = new Date();
        this.authorizationNumber = this.paidAt.getTime();
        this.amount = order.totalAmount;
        this.invoice = new Invoice(order);
    }
}

class CreditCard implements PaymentMethod {
    constructor(public number: string) {}
}

interface PaymentMethod {}

class Invoice {
    public billingAddress: Address;
    public shippingAddress: Address;

    constructor(public order: Order) {
        this.billingAddress = order.address;
        this.shippingAddress = order.address;
    }
}

class Product {
    constructor(public name: string, public type: ProductType, public price: number) {}
}

enum ProductType {
    PHYSICAL = 'PHYSICAL',
    BOOK = 'BOOK',
    DIGITAL = 'DIGITAL',
    MEMBERSHIP = 'MEMBERSHIP'
}

class Address {}

class Customer {}

// Exemplo de uso
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
// now, how to deal with shipping rules then?
