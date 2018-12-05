from product.base import Product
from notifier import SHIPPING_LABEL


class DefaultProduct(Product):
    @property
    def has_shipping(self):
        return True

    @property
    def price(self):
        return self._data['price'] * 1.17

    @property
    def notification(self):
        return '', SHIPPING_LABEL
