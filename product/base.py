from backend.data_model import DataModel


class Product(DataModel):
    @property
    def length(self):
        '''This information is useful to calculate the shpping cost'''
        return self._data.get('length')

    @property
    def width(self):
        '''This information is useful to calculate the shpping cost'''
        return self._data.get('width')

    @property
    def height(self):
        '''This information is useful to calculate the shpping cost'''
        return self._data.get('height')

    @property
    def weight(self):
        '''This information is useful to calculate the shpping cost'''
        return self._data.get('weight')

    @property
    def price(self):
        ''' Return the cost of product including tax and discount. '''
        raise NotImplementedError()

    @property
    def notification(self):
        '''Generate a default notification to each product type to send to user email or to print on shipping label
        and return a message and the notification type.'''
        raise NotImplementedError()

    @property
    def has_shipping(self):
        ''' Return a bollean to indicate if needs calculate the shippping cost or not. '''
        raise NotImplementedError()

    def __init__(self, data):
        self._data = data