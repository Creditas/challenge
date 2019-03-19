class Voucher(object):
    customer = None
    value = 0

    def __init__(self, customer, value):
        self.customer = customer
        self.value = value
