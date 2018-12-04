from product.base import Product
from notifier import SHIPPING_LABEL


class BookProduct(Product):
    @property
    def has_shipping(self):
        return True

    @property
    def price(self):
        return self._data['price']

    @property
    def notification(self):
        return 'Book product doesn\'t has to pay tax because of Constituição Art. 150, VI, d', SHIPPING_LABEL