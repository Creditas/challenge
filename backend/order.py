import time

class Order:

    def __init__(self, customer):
        '''
        Constructor for the Order class.

        Args:
            customer (Customer): customer that is requesting order.
        '''
        self.customer = customer
        self.items = []
        self.closed_at = None

    def add_product(self, product, quantity=1):
        '''
        Adds certain quantity of a product.

        Args:
            product (int): product to be added.
            quantity(int, optional): quantity to be added (default: 1).
        '''
        lim = quantity + 1
        for num in range(1, lim):
            self.items.append(product)
    
    def total_amount(self):
        '''
        Returns the total quantity of added products.
        '''
        return len(self.items)

    def close(self, closed_at=time.time()):
        '''
        Closes order and registers closing time.

        Args:
            closed_at (float, optional): closing time.
        '''
        self.closed_at = closed_at
        for item in self.items:
            self.process_product(item)
        self.customer.notify_user(self)

    def process_product(self, product):
        '''
        Processes product according to its kind.

        Args:
            product (Product): product to be processed.
        '''
        if (product.kind == 'physical'):
            self.generate_shipping_label(False)
        elif (product.kind == 'book'):
            self.generate_shipping_label(True)
        elif (product.kind == 'digital'):
            self.customer.membership.increment_bonus(10)
        else: #service
            product.activate_signature()

    def generate_shipping_label(self, tax_discount=False):
        '''
        Generates physical shipping label.

        Args:
            tax_discount (bool, optional): True if tax discount applies, False otherwise.
        '''
        if(tax_discount):
            # Generates shipping label with no tax discount
            pass
        else:
            # Generates shipping label with tax discount
            pass