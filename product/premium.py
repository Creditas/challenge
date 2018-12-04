from product.base import Product
from notifier import EMAIL


class PremiumProduct(Product):
    @property
    def has_shipping(self):
        return False

    @property
    def price(self):
        ''' Apply 13% of tax. '''
        return self._data['price'] * 1.13

    @property
    def notification(self):
        message = '\n\r'.join([
            'Congratulations! You bought {product} but before use it, you need to activate your account.',
            'Instructions ...'
        ]).format(product=self._data['name'])
        return message, EMAIL