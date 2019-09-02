import unittest
from bootstrap import Customer, Order, Product, CreditCard, Payment, Membership

customerAttributes = dict(
    pin="35819290012",
    name="Fulano da Silva",
    email="fulano@familiadasilva.com.br"
)

foolano = Customer(customerAttributes)

book = Product(name='My first book', type='book', value=10.50)
smartphone_charger = Product(name='Smartphone Charger', type='physical', value=21.30)
wineMembership = Product(name='Wine Membership', type='membership', value=10.00)
babySharkVideo = Product(name='Baby Shark Video', type='digital', value=13.40)
cardsMembership = Product(name='Cards Membership', type='membership', value=10.20)

myOrder = Order(foolano)
myOrder.add_product(book)
myOrder.add_product(babySharkVideo)
myOrder.add_product(wineMembership)
myOrder.add_product(smartphone_charger)
myOrder.add_product(cardsMembership)

paymentAttributes = dict(
    order = myOrder,
    payment_method = CreditCard.fetch_by_hashed('43567890-987654367')
)

payment = Payment(paymentAttributes)
payment.pay()

myOrder.ship(payment)

def countSubstringOnList(arrayList, substring):

    count = 0

    for text in arrayList:
        if substring in text:
            count += 1

    return count


def findSubstringOnList(arrayList, substring):
    notFound = False
    
    for text in arrayList:
        if substring in text:
            return True

    return notFound

class customer_tests(unittest.TestCase):

    def test_create_customer(self):

        self.assertEqual(foolano.name, "Fulano da Silva")

class order_test(unittest.TestCase):

    def test_total_order(self):

        self.assertEqual(myOrder.total_amount(), 65.40)

    def test_all_items_added(self):

        self.assertEqual(len(myOrder.items), 5)

class payment_test(unittest.TestCase):

    def test_if_is_paid(self):

        self.assertTrue(payment.is_paid())

class ship_test(unittest.TestCase):

    def test_if_has_more_than_one_shipping_label(self):

        self.assertGreater(countSubstringOnList(myOrder.ship_messages, "Shipping Label"), 1)

    def test_if_has_tax_message(self):

        self.assertEqual(findSubstringOnList(myOrder.ship_messages, "Item isento de impostos"), True)

    def test_if_emails_sended(self):

        self.assertEqual(countSubstringOnList(myOrder.ship_messages, "sended to"), 3)

    def test_if_voucher_added(self):

        self.assertGreater(len(foolano.vouchers), 0)

unittest.main()