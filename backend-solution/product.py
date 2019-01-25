from enum import Enum


class ProductKind(Enum):
    physic = 'physic'
    digital = 'digital'

    @classmethod
    def is_physic(cls, product_type):
        return product_type == cls.physic


class Product():
    def __init__(self, name: str, kind: ProductKind, price: int):
        self.name = name
        self.kind = kind
        self.price = price
