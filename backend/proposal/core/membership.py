import time

class Membership:
    customer = None
    activated_at = None

    def __init__(self, customer):
        self.customer = customer

    def activate(self, activated_at=time.time()):
        self.activated_at = activated_at
