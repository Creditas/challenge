from data_model import DataModel
from order import Order
from notifier import Notifier


CARD = 'credit_card'
BANK_TRANSFER = 'bank_transfer'


def card(order):
    pass


def bank_transfer(order):
    pass


_PROCESSORS = {
    CARD: card,
    BANK_TRANSFER: bank_transfer
}


class Payment(DataModel):

    ''' I could create a factory class to each payment method but seems not be complex. '''

    def __init__(self, payment_id):
        ''' Get in database all informations (data) related to the payment_id. '''
        self.order = Order(order_id)
        self.notifier = Notifier()

    def pay(self, method):
        ''' Make the payment and add the invoice information in database if all process is ok will notify. '''
        processor = _PROCESSORS.get(method)
        if not processor:
            raise ValueError('Payment method not supported.')
        self.invoice = processor(self.order)
        self.order.notify(self.notifier)
        self.notifier.process()
