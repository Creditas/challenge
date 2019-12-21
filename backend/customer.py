from membership import Membership

class Customer:

    def __init__(self, name, email):
        '''
        Constructor for Customer class.

        Args:
            name (string): name of the customer.
            email (string): email address of the customer.
        '''
        self.name = name
        self.email = email
        self.membership = Membership()
        self.billing_address = None
        self.shipping_address = None

    def notify_user(self, order):
        '''
        Notifies user about the order via email.

        Args:
            order (Order): order to notify the user about.
        '''
        pass