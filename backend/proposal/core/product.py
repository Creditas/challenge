class Product:
    # use type to distinguish each kind of product: physical, book, digital, membership, etc.
    name = None
    type = None
    PHYSICAL = "physical"
    BOOK = "book"
    DIGITAL = "digital"
    MEMBERSHIP = "membership"
    AVAILABLE_TYPES = [PHYSICAL, BOOK, DIGITAL, MEMBERSHIP]

    def __init__(self, name, type):
        self.name = name
        # Checking if type is valid
        if type in self.AVAILABLE_TYPES:
            self.type = type
        else:
            # Throwing error
            raise ValueError("Invalid type of product")
