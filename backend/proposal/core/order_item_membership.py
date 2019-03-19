from core.order_item import OrderItem
from core.membership import Membership

class OrderItemMembership(OrderItem):
    membership = None

    # Creates and activates a membership
    def __prepare_membership(self):
        customer = self.order.customer
        self.membership = Membership(customer)
        self.membership.activate()

    def dispatch(self):
        self.__prepare_membership()
