from core.order_item import OrderItem

class OrderItemBook(OrderItem):
    def dispatch(self):
        # Just generate a shipping label
        self.generate_shipping_label("Duty Free")
