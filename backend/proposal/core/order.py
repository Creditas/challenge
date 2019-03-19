import time
from core.order_item import OrderItem
from core.order_item_book import OrderItemBook
from core.order_item_digital import OrderItemDigital
from core.order_item_membership import OrderItemMembership
from core.order_item_physical import OrderItemPhysical
from core.address import Address
from core.product import Product

class Order:
    customer = None
    items = None
    payment = None
    address = None
    closed_at = None

    def __init__(self, customer, attributes={}):
        self.customer = customer
        self.items = []
        self.address = attributes.get('address', Address(zipcode='45678-979'))
    
    def __get_order_item_class(self, product):
        if product.type == Product.BOOK:
            return OrderItemBook
        elif product.type == Product.DIGITAL:
            return OrderItemDigital
        elif product.type == Product.MEMBERSHIP:
            return OrderItemMembership
        elif product.type == Product.PHYSICAL:
            return OrderItemPhysical
        # Invalid type
        return None

    def add_product(self, product):
        order_item_class = self.__get_order_item_class(product)
        self.items.append(order_item_class(order=self, product=product))

    def total_amount(self):
        total = 0
        for item in self.items:
            total += item.total()

        return total

    def close(self, closed_at=time.time()):
        # Dispatching for each OrderItem
        for item in self.items:
            item.dispatch()
        # Closing
        self.closed_at = closed_at
