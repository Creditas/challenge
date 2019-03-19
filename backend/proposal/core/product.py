class Product:
    # use type to distinguish each kind of product: physical, book, digital, membership, etc.
    name = None
    type = None

    def __init__(self, name, type):
        self.name = name
        self.type = type
