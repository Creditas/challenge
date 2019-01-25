from typing import List
from product import Product
from customer import Customer
from shipping_label import ShippingLabel


class Order():
    def __init__(self, products: List[Product], customer: Customer):
        self.products = products
        self.customer = customer

    def generate_shipping_labels(self) -> List[ShippingLabel]:
        return list(map(lambda i: ShippingLabel(i), self.products))

    def pay(self):
        order_amount = sum(list(map(lambda i: i.price, self.products)))

        self.customer.wallet -= order_amount
