import time
from customer import Address
from customer import Customer
from product import Product


class OrderItem():
    order = None
    price = 0.0

    def __init__(self, order, productType, price):
        self.order = order
        self.productType = productType
        self.price = price


class OrderTotal(Customer):
    closed_at = None
    items = []
    totalPrice = 0.0
    numOfItems = None

    def __init__(self, customer):
        self.customer = customer.customerName
        self.items = []
        self.numOfItems = None
        self.totalPrice = 0.0

    def putOnCart(self, order_item):
        self.order_item = order_item
        self.items.append([order_item.order, order_item.productType])
        self.numOfItems = len(self.items)
        self.totalPrice += order_item.price

    def close(self, closed_at=time.time()):
        self.closed_at = closed_at
        Product(self.items, self.customer)
