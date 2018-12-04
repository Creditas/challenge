from product.client.book import BookProduct
from product.client.digital import DigitalProduct
from product.client.premium import PremiumProduct
from product.client.default import DefaultProduct


BOOK = 'book'
PREMIUM = 'premium'
DIGITAL = 'digital'
DEFAULT = 'default'


def product_factory(id):
    ''' Get all informations (data) from database. '''
    _cls = dict(BOOK=BookProduct, PREMIUM=PremiumProduct, DIGITAL=DigitalProduct)
    klass = _cls.get(data['type'], DefaultProduct)
    return klass(data)