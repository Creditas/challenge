from abc import ABC, abstractmethod
import time

# Classe abstrata para definir o contrato de pagamento
class PaymentStrategy(ABC):
    @abstractmethod
    def process_payment(self, payment):
        pass

# Pagamento de item físico
class PhysicalItemPaymentStrategy(PaymentStrategy):
    def process_payment(self, payment):
        payment.generate_shipping_label()
        payment.close_order()

# Pagamento de livro (isento de impostos)
class BookPaymentStrategy(PaymentStrategy):
    def process_payment(self, payment):
        payment.generate_shipping_label(tax_exempt=True)
        payment.close_order()

# Pagamento de mídia digital (com voucher)
class DigitalMediaPaymentStrategy(PaymentStrategy):
    def process_payment(self, payment):
        payment.send_purchase_email()
        payment.issue_voucher()
        payment.close_order()

# Pagamento de assinatura (membership)
class MembershipPaymentStrategy(PaymentStrategy):
    def process_payment(self, payment):
        payment.activate_membership()
        payment.send_activation_email()
        payment.close_order()

# Classe de pagamento que utiliza o padrão Strategy
class Payment:
    authorization_number = None
    amount = None
    invoice = None
    order = None
    payment_method = None
    paid_at = None

    def __init__(self, attributes={}):
        self.authorization_number = None
        self.amount = None
        self.invoice = None
        self.order = attributes.get('order', None)
        self.payment_method = attributes.get('payment_method', None)
        self.paid_at = None

    def pay(self, strategy: PaymentStrategy, paid_at=time.time()):
        self.amount = self.order.total_amount()
        self.authorization_number = int(time.time())
        self.invoice = Invoice(attributes={
            'billing_address': self.order.address,
            'shipping_address': self.order.address,
            'order': self.order
        })
        self.paid_at = paid_at
        strategy.process_payment(self)

    def is_paid(self):
        return self.paid_at is not None

    # Gera uma etiqueta de envio (shipping label)
    def generate_shipping_label(self, tax_exempt=False):
        label_info = "Shipping label generated"
        if tax_exempt:
            label_info += " (Tax Exempt for Books)"
        print(label_info)

    # Envia email de compra para mídia digital
    def send_purchase_email(self):
        print("Email sent with purchase details for digital media")

    # Concede voucher para mídia digital
    def issue_voucher(self):
        print("R$10 voucher issued")

    # Ativa a assinatura
    def activate_membership(self):
        print("Membership activated")

    # Envia email de ativação da assinatura
    def send_activation_email(self):
        print("Membership activation email sent")

    # Fecha o pedido
    def close_order(self):
        self.order.close(self.paid_at)


class Invoice:
    billing_address = None
    shipping_address = None
    order = None

    def __init__(self, attributes={}):
        self.billing_address = attributes.get('billing_address', None)
        self.shipping_address = attributes.get('shipping_address', None)
        self.order = attributes.get('order', None)


class Order:
    customer = None
    items = None
    address = None
    closed_at = None

    def __init__(self, customer, attributes={}):
        self.customer = customer
        self.items = []
        self.address = attributes.get('address', Address(zipcode='45678-979'))

    def add_product(self, product):
        self.items.append(OrderItem(order=self, product=product))

    def total_amount(self):
        total = sum([item.total() for item in self.items])
        return total

    def close(self, closed_at=time.time()):
        self.closed_at = closed_at


class OrderItem:
    def __init__(self, order, product):
        self.order = order
        self.product = product

    def total(self):
        # Apenas como exemplo, retornando valor fixo
        return 10


class Product:
    def __init__(self, name, type):
        self.name = name
        self.type = type


class Address:
    def __init__(self, zipcode):
        self.zipcode = zipcode


class CreditCard:
    @staticmethod
    def fetch_by_hashed(code):
        return CreditCard()


class Customer:
    pass


# Exemplo de Pagamento de Livro (testando o código)
foolano = Customer()
book = Product(name='Awesome book', type='book')
book_order = Order(foolano)
book_order.add_product(book)

attributes = {
    'order': book_order,
    'payment_method': CreditCard.fetch_by_hashed('43567890-987654367')
}
payment_book = Payment(attributes=attributes)
book_payment_strategy = BookPaymentStrategy()
payment_book.pay(book_payment_strategy)

print(payment_book.is_paid())  # < True
print(payment_book.order.items[0].product.type)  # < book
