class Invoice:

    def __init__(self, order):
        '''
        Constructor for the Invoice class.

        Args:
            order (Order): order to which the invoice is being issued.
        '''
        self.order = order
        self.billing_address = self.order.customer.billing_address
        self.shipping_address = self.order.customer.shipping_address