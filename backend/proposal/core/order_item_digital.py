from core.order_item import OrderItem
from core.voucher import Voucher
from services.send_email import SendEmail

class OrderItemDigital(OrderItem):
    voucher = None

    def __send_detailed_email(self):
        customer = self.order.customer
        # Not implemented the details of the email, just implementing the architecture
        SendEmail()(customer.email, "Order Info", "Order Info Detailed")
    
    def __conceed_voucher(self):
        customer = self.order.customer
        self.voucher = Voucher(customer, 10)
    
    def dispatch(self):
        # Sending the email
        self.__send_detailed_email()
        # Conceeding a voucher
        self.__conceed_voucher()
