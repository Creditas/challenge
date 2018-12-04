# from urllib.parse import urlencode

from data_model import DataModel
from product import product_factory
from customer import Customer


def calculate_shipping(self, address, product):
    '''
    A mock to calculate a shippping cost, to this function I will use a micro-service to get the cost.
    Sample:
        params = urlencode({
            'address': address,
            'length': product.length,
            'width': product.width,
            'height': product.height,
            'weight': product.weight
        })
        request = Requests.get('http://microservice.com/shipping?{0}'.format(params)
        return request.json().get('price')
    '''
    pass


class Order(DataModel):
    @property
    def total(self):
        return sum([product['total'] for product in self.shipping_cost])

    @property
    def shipping_cost(self):
        shipping = {}
        for _id in self._data['products']:
            shipping = 0
            product = product_factory(_id)
            if product.has_shippping:
                shipping = calculate_shipping(self.customer.address, product)
            total = product.price + shipping
            shipping[product.name] = dict(total=total, price=product.price, shipping=shipping)
        return shipping

    def __init__(self, order_id):
        ''' Get in database all informations (data) related to the order_id (customer and products). '''
        self.customer = Customer(customer_data_id)
        self._products_id = product_ids

    def notify(self, notifier):
        ''' Add extra information in notifiers. '''
        for _id in self._products_id:
            product = product_factory(_id)
            notifier.add(*product.notification)
