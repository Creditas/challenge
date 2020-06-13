import time

class Payment:
    authorization_number = None
    amount = None
    invoice = None
    order = None
    payment_method = None
    paid_at = None

    def __init__(self, attributes={}):
        self.authorization_number = attributes.get('attributes', None)
        self.amount = attributes.get('amount', None)
        self.invoice = attributes.get('invoice', None)
        self.order = attributes.get('order', None)
        self.payment_method = attributes.get('payment_method', None)

    def pay(self, paid_at=time.time()):
        self.amount = self.order.total_amount
        self.authorization_number = int(time.time())
        attributes = dict(
            billing_address=self.order.address,
            shipping_address=self.order.address,
            order=self.order
        )
        self.invoice = Invoice(attributes=attributes)
        self.paid_at = paid_at
        self.order.close(self.paid_at)

    def is_paid(self):
        return self.paid_at != None


class Invoice:
    billing_address = None
    shipping_address = None
    order = None

    def __init__(self, attributes={}):
        self.billing_address = attributes.get('billing_address', None)
        self.shipping_address = attributes.get('shipping_address', None)
        self.order = attributes.get('order', None)


class Order:
    costomer = None
    items = None
    payment = None
    address = None
    closed_at = None

    def __init__(self, costomer, attributes={}):
        self.costomer = costomer
        self.items = []
        self.order_item_class = attributes.get('order_item_class', OrderItem)
        self.address = attributes.get('address', Address(zipcode='45678-979'))

    def add_product(self, product):
        self.items.append(self.order_item_class(order=self, product=product))

    def total_amount(self):
        total = 0
        for item in items:
            total += item.total

        return total

    def close(self, closed_at=time.time()):
        self.closed_at = closed_at

    # remember: you can create new methods inside those classes to help you create a better design


class OrderItem:
    order = None
    product = None

    def __init__(self, order, product):
        self.order = order
        self.product = product

    def total(self):
        return 10

class Product:
    # use type to distinguish each kind of product: physical, book, digital, membership, etc.
    name = None
    type = None

    def __init__(self, name, type):
        self.name = name
        self.type = type


class Address:
    zipcode = None

    def __init__(self, zipcode):
        self.zipcode = zipcode


class CreditCard:

    @staticmethod
    def fetch_by_hashed(code):
        return CreditCard()


class Costomer:
    name = None
    email = None
    vouchers = None
    member = None
    
    def __init__(self, name, email):
        self.name = name
        self.email = email
        self.vouchers = []
        self.member = False
    
    def give_voucher(self, voucher):
        self.vouchers.append(voucher)
    
    def make_member(self):
        self.member = True


class Membership:
    costomer = None
    since = None

    def __init__(self, costomer):
        self.costomer = costomer
        self.since = time.time()

class Mail:
    to = None
    content = None

    def __init__(self, to, content):
        self.to = to
        self.content = content

    def send(self):
        #send_mail(self.to, self.content)
        pass

class Voucher:
    value = None

    def __init__(self, value):
        self.value = value

class ShippingLabel:
    address = None
    recipient = None
    description = None
    type = None
    types = ["physical", "book"]

    def __init__(self, address, recipient, description, type):
        self.address = address
        self.recipient = recipient
        self.description = description
        self.type = type
    
    def _physical_label(self):
        label = """ 
        CEP: %s 
        Destinatário: %s
        Conteúdo: %s
        """ % (
            self.address.zipcode,
            self.recipient,
            self.description
        )

        return label
    
    def _book_label(self):
        label = """ 
        CEP: %s 
        Destinatário: %s
        Conteúdo: Livro '%s'
        ** Item isento de impostos conforme disposto na Constituição Art. 150, VI, d. **
        """ % (
            self.address.zipcode,
            self.recipient,
            self.description
        )

        return label

    def print(self):
        label = ""
        if self.type in self.types:
            label = getattr(self, "_%s_label" % self.type) ()
        
        return label

class Shipping:
    payment = None
    p_types = ["physical", "book", "digital", "membership"]

    def __init__(self, payment):
        self.payment = payment
    
    def _physical(self, product_name):
        label = ShippingLabel(
            self.payment.order.address,
            self.payment.order.costomer.name,
            product_name,
            "physical"
        )
        response = {
            "message": label.print()
        }

        return response

    def _book(self, product_name):
        label = ShippingLabel(
            self.payment.order.address,
            self.payment.order.costomer.name,
            product_name,
            "book"
        )
        response = {
            "message": label.print()
        }

        return response
    
    def _digital(self, product_name):
        voucher = Voucher(10)
        self.payment.order.costomer.give_voucher(voucher)

        mail_content = "Obrigado por comprar %s conosco, você ganhou um voucher de R$ 10" % product_name
        mail = Mail(self.payment.order.costomer.email, mail_content)
        mail.send()

        response = {
            "message": "Obrigado por comprar %s conosco, você ganhou um voucher de R$ 10" % product_name
        }

        return response
    
    def _membership(self, product_name):
        costomer_membership = Membership(self.payment.order.costomer)
        self.payment.order.costomer.make_member()

        response = {
            "message": "Obrigado por se tornar membro!",
            "membership": costomer_membership
        }

        return response

    def ship(self):
        for p in self.payment.order.items:
            if p.product.type in self.p_types:
                processed = getattr(self, "_%s" % p.product.type)(p.product.name)

                print(processed["message"])
            else:
                print("Produto - %s - tipo não identificado" % p.product.name)


