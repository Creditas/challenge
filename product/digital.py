from product.base import Product
from notifier import EMAIL


class DigitalProduct(Product):
    @property
    def has_shipping(self):
        return False

    @property
    def price(self):
        ''' Apply 10% discount and 5% of tax '''
        return self._data['price'] * 0.90 * 1.05

    @property
    def notification(self):
        return 'Congratulations! You received a 10\% discount on digital products.', EMAIL