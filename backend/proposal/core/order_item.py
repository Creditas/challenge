class OrderItem:
    order = None
    product = None

    def __init__(self, order, product):
        self.order = order
        self.product = product

    def total(self):
        return 10
    
    # On this function, you can pass additionnal info to add on the shipping label
    def generate_shipping_label(self, additional_info = ""):
        return "Shipping Label\n{0}".format(additional_info)
