import time


class Customer:
    # you can customize this class by yourself
    pass


class Address:
    zipcode: str = None

    def __init__(self, zipcode: str) -> None:
        self.zipcode = zipcode


class Product:
    name: str = None
    type: str = None

    def __init__(self, name: str, product_type: str) -> None:
        self.name = name
        self.type = product_type


class OrderItem:
    product: Product = None

    def __init__(self, product: Product) -> None:
        self.product = product

    @staticmethod
    def total() -> int:
        return 10


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

    def add_product(self, product: Product):
        self.items.append(self.order_item_class(product=product))

    def total_amount(self) -> int:
        return len(self.items)

    def close(self, closed_at: float = time.time()) -> None:
        self.closed_at = closed_at


class Invoice:
    billing_address: Address | None = None
    shipping_address: Address | None = None
    order: Order | None = None

    def __init__(self, data: dict = None) -> None:
        self.billing_address = data.get('billing_address', None)
        self.shipping_address = data.get('shipping_address', None)
        self.order = data.get('order', None)


class Payment:
    authorization_number: int | None = None
    amount: int | None = None
    invoice: Invoice | None = None
    order: Order | None = None
    payment_method: str | None = None
    paid_at: float = None

    def __init__(self, data: dict = None) -> None:
        self.authorization_number = data.get('attributes', None)
        self.amount = data.get('amount', 0)
        self.invoice = data.get('invoice', None)
        self.order = data.get('order', None)
        self.payment_method = data.get('payment_method', None)

    def pay(self, paid_at: float = time.time()):
        self.amount = self.order.total_amount()
        self.authorization_number = int(time.time())
        data = dict(
            billing_address=self.order.address,
            shipping_address=self.order.address,
            order=self.order
        )
        self.invoice = Invoice(data=data)
        self.paid_at = paid_at
        self.order.close(self.paid_at)

    def is_paid(self) -> bool:
        return self.paid_at is not None


class CreditCard:
    @staticmethod
    def fetch_by_hashed(code):
        return CreditCard()


class Membership:
    # you can customize this class by yourself
    pass


foolano = Customer()
book = Product(name='Awesome book', product_type='book')
book_order = Order(foolano)
book_order.add_product(book)

attributes = dict(
    order=book_order,
    payment_method=CreditCard.fetch_by_hashed('43567890-987654367')
)
payment_book = Payment(data=attributes)
payment_book.pay()
print(payment_book.is_paid())
print(payment_book.order.items[0].product.type)
