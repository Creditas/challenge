class Product:
    # use type to distinguish each kind of product: physical, book, digital, membership, etc.
    name = None
    type = None
    AVAILABLE_TYPES=["physical", "book", "digital", "membership"]

    def __init__(self, name, type):
        self.name = name
        # Checking if type is valid
        if type in self.AVAILABLE_TYPES:
            self.type = type
        else:
            # Throwing error
            raise ValueError("Invalid type of product")
