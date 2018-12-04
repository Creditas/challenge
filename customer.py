from order import Order


class Customer:
    @property
    def address(self):
        return dict(zip_code=self._data.get('zip_code'), address=self._data['address'])

    def __init__(self, _id):
        ''' Get all informations (data) from database. '''
        self._data = data

    def get_order(self, products=None):
        ''' Get the opened order in database if doesn't exist create a new one. '''
        if not order:
            order = Order.create({'customer': self, 'products': products})
        elif products:
            order.update({'products': products})
        return order
