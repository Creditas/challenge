import functools
import time
from typing import Any


class Customer:
    # you can customize this class by yourself
    pass


class Membership:
    # you can customize this class by yourself
    pass


class Address:
    zipcode: str = None

    def __init__(self, zipcode: str) -> None:
        self.zipcode = zipcode


class Product:
    name: str = None
    unity_price: float = None
    type: str = None

    def __init__(self, name: str, unity_price: float, product_type: str) -> None:
        self.name = name
        self.unity_price = unity_price
        self.type = product_type


class OrderItem:
    product: Product = None
    quantity: int = None

    def __init__(self, product: Product, quantity: int) -> None:
        self.product = product
        self.quantity = quantity

    def total_price(self) -> float:
        return self.product.unity_price * self.quantity


class Order:
    customer: Customer = None
    items: list[OrderItem] = None
    address: Address = None
    closed_at: float = None

    def __init__(self, customer: Customer, data: dict = None) -> None:
        self.customer = customer
        self.items = []
        self.order_item_class = data.get('order_item_class', OrderItem)
        self.address = data.get('address', Address(zipcode='45678-979'))

    def add_product(self, product: Product, quantity: int) -> None:
        self.items.append(self.order_item_class(product=product, quantity=quantity))

    def total_amount(self) -> int:
        return functools.reduce(lambda accumulated, order: accumulated + order.quantity, self.items, 0)

    def close(self, closed_at: float = time.time()) -> None:
        self.closed_at = closed_at


class Invoice:
    price: float = None
    billing_address: Address | None = None
    shipping_address: Address | None = None
    order: Order | None = None

    def __init__(
            self,
            price: float,
            billing_address: Address = None,
            shipping_address: Address = None,
            order: Order = None
    ) -> None:
        self.price = price
        self.billing_address = billing_address
        self.shipping_address = shipping_address
        self.order = order


class CreditCard:
    @staticmethod
    def fetch_by_hashed(code):
        return CreditCard()


class Payment:
    authorization_number: int | None = None
    amount: int | None = None
    invoice: Invoice | None = None
    order: Order | None = None
    payment_method: str | None = None
    paid_at: float = None

    def __init__(
            self,
            authorization_number: int = None,
            amount: int = None,
            invoice: Invoice = None,
            order: Order = None,
            payment_method: CreditCard = None
    ) -> None:
        self.authorization_number = authorization_number
        self.amount = amount
        self.invoice = invoice
        self.order = order
        self.payment_method = payment_method

    def pay(self, price: float = None, paid_at: float = time.time()):
        self.amount = self.order.total_amount()
        self.authorization_number = int(time.time())
        self.invoice = Invoice(
            price=price if price is not None else self.generate_payment_price(),
            billing_address=self.order.address,
            shipping_address=self.order.address,
            order=self.order
        )
        self.paid_at = paid_at
        self.order.close(self.paid_at)

    def generate_shipping_label(self) -> None:
        print("Will generate default shipping label for payment with number", self.authorization_number)

    def notify_user(self) -> None:
        print("Will notify customer with e-mail of a new payment. Order:", self.order)

    def generate_payment_price(self) -> float:
        return functools.reduce(lambda accumulated, item: accumulated + item.total_price(), self.order.items, 0)

    def is_paid(self) -> bool:
        return self.paid_at is not None


class PhysicalItemPayment(Payment):
    def __init__(
            self,
            authorization_number: int = None,
            amount: int = None,
            invoice: Invoice = None,
            order: Order = None,
            payment_method: CreditCard = None
    ) -> None:
        super().__init__(
            authorization_number=authorization_number,
            amount=amount,
            invoice=invoice,
            order=order,
            payment_method=payment_method
        )

    def pay(self, price: float = None, paid_at: float = time.time()):
        super().pay()
        super().generate_shipping_label()


class SubscriptionPayment(Payment):
    membership: Membership = None

    def __init__(
            self,
            authorization_number: int = None,
            amount: int = None,
            invoice: Invoice = None,
            order: Order = None,
            payment_method: CreditCard = None
    ) -> None:
        super().__init__(
            authorization_number=authorization_number,
            amount=amount,
            invoice=invoice,
            order=order,
            payment_method=payment_method
        )

    def pay(self, price: float = None, paid_at: float = time.time()) -> None:
        super().pay()
        self.membership = Membership()
        super().notify_user()


class BooksPayment(Payment):
    def __init__(
            self,
            authorization_number: int = None,
            amount: int = None,
            invoice: Invoice = None,
            order: Order = None,
            payment_method: CreditCard = None
    ) -> None:
        super().__init__(
            authorization_number=authorization_number,
            amount=amount,
            invoice=invoice,
            order=order,
            payment_method=payment_method
        )

    def pay(self, price: float = None, paid_at: float = time.time()):
        super().pay()
        self.generate_shipping_label()

    def generate_shipping_label(self):
        print("Will generate shipping label for payment with notification about Art. 150: ", self.authorization_number)


class DigitalMediaPayment(Payment):
    def __init__(
            self,
            authorization_number: int = None,
            amount: int = None,
            invoice: Invoice = None,
            order: Order = None,
            payment_method: CreditCard = None
    ) -> None:
        super().__init__(
            authorization_number=authorization_number,
            amount=amount,
            invoice=invoice,
            order=order,
            payment_method=payment_method
        )

    def pay(self, price: float = None, paid_at: float = time.time()):
        price = super().generate_payment_price() - 10
        super().pay(price=price)
        super().notify_user()


foolano = Customer()
book = Product(name='Awesome book', product_type='book', unity_price=10)
book_order = Order(foolano)
book_order.add_product(book, 1)
payment = CreditCard.fetch_by_hashed('43567890-987654367')

payment_book = BooksPayment(order=book_order, payment_method=payment)
payment_book.pay()
print(payment_book.is_paid())
print(payment_book.order.items[0].product.type)
