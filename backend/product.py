class Product:
    
    def __init__(self, name, kind, price):
        '''
        Constructor for the Product class.

        Args:
            name (string): name of the product.
            kind (string): kind of product (physical, book, service or digital).
            price (string): price of the product.
        '''
        self.name = name
        self.kind = kind
        self.price = price

    def activate_signature(self):
        '''
        Activates signature for service kind products.
        '''
        pass
        