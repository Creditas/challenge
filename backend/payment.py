import time
from invoice import Invoice

class Payment:
    def __init__(self, attributes={}):
        '''
        Constructor for the Payment class.

        Args:
            attributes (dict): contains the "order" and "payment_method".
        '''
        self.invoice = None
        self.order = attributes.get('order', None)
        self.payment_method = attributes.get('payment_method', None)

    def pay(self):
        '''
        Processes payment for order items.
        '''
        self.invoice = Invoice(order=self.order)
        self.order.close(time.time())

    def is_paid(self):
        '''
        Returns True if payment was processed.
        '''
        return self.order.paid_at != None