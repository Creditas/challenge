from typing import List
from product import Product, ProductKind
from customer import Customer
from shipping_label import ShippingLabel


class Order():
    def __init__(self, products: List[Product], customer: Customer):
        self.products = products
        self.customer = customer

    def generate_shipping_labels(self) -> List[ShippingLabel]:
        return list(map(lambda i: ShippingLabel(i), self.products))

    def pay(self):
        should_send_discount_voucher = any(
            map(lambda i: i.kind == ProductKind.digital, self.products)
        )

        if should_send_discount_voucher:
            self.customer.send_email('discount voucher R$ 10')

        order_amount = sum(list(map(lambda i: i.price, self.products)))

        self.customer.wallet -= order_amount
