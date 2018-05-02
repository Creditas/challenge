import unittest

from bootstrap import (
    Customer,
    Product,
    Order,
    OrderItem,
    Payment,
)


class CustomerTestCase(unittest.TestCase):
    def test_create_customer_instance(self):
        '''
        Should create a new valid instance of Costumer
        '''
        customer = Customer(
            name='fake',
            email='fake@fake.com',
            shipping_address='fake',
            billing_address='fake'
        )
        self.assertIsInstance(customer, Customer)

    def test_create_customer_instance_without_required_args(self):
        '''
        Should raise TypeError:
        __init__() missing 4 required positional arguments:
        'name', 'email', 'shipping_address', 'billing_address'

        '''
        with self.assertRaises(TypeError):
            Customer()


class ProductTestCase(unittest.TestCase):
    def test_create_product_instance(self):
        '''
        Should create a new valid instance of Product
        '''
        product = Product(
            name='Fake Product',
            kind='book'
        )
        self.assertIsInstance(product, Product)

    def test_create_product_without_required_args(self):
        '''
        Should raise TypeError:
        __init__() missing 2 required positional arguments: 'name' and 'kind'

        '''
        with self.assertRaises(TypeError):
            Product()


class OrderTestCase(unittest.TestCase):
    def setUp(self):
        self.customer = Customer(
            name='fake',
            email='fake@fake.com',
            shipping_address='fake',
            billing_address='fake'
        )
        self.product = Product(
            name='Fake Product',
            kind='book'
        )

    def test_create_order_instance(self):
        '''
        Should create a new valid instance of Order
        '''
        order = Order(self.customer)
        self.assertIsInstance(order, Order)

    def test_create_order_without_required_args(self):
        '''
        Should raise TypeError:
        __init__() missing 1 required positional argument: 'customer'

        '''
        with self.assertRaises(TypeError):
            Order()

    def test_order_add_product_behavior(self):
        '''
        Should add product to `items` attribute
        '''
        order = Order(self.customer)
        order.add_product(self.product, 10)
        self.assertNotEqual(order.items, [])
        self.assertIsInstance(order.items[0], OrderItem)

    def test_order_total_amount_count(self):
        '''
        Should return count of items in this order
        '''
        order = Order(self.customer)
        order.add_product(self.product, 1)
        order.add_product(self.product, 2)
        order.add_product(self.product, 3)
        order.add_product(self.product, 4)
        order.add_product(self.product, 5)

        self.assertEqual(order.total_amount, 15)

    def test_order_close_behavior(self):
        '''
        After close, closed_at should not be None
        '''
        order = Order(self.customer)
        order.close()
        self.assertNotEqual(order.closed_at, None)


class OrderItemTestCase(unittest.TestCase):
    def setUp(self):
        self.customer = Customer(
            name='fake',
            email='fake@fake.com',
            shipping_address='fake',
            billing_address='fake'
        )
        self.order = Order(self.customer)
        self.product = Product(
            name='Fake Product',
            kind='book'
        )

    def test_create_order_item_instance(self):
        '''
        Should create a new valid instance of OrderItem
        '''
        order_item = OrderItem(
            order=self.order,
            product=self.product,
            quantity=10
        )
        self.assertIsInstance(order_item, OrderItem)

    def test_create_order_without_required_args(self):
        '''
        Should raise TyoeError
        __init__() missing 3 required positional arguments:
        'order', 'product', and 'quantity'

        '''
        with self.assertRaises(TypeError):
            OrderItem()


class PaymentTestCase(unittest.TestCase):
    def setUp(self):
        self.customer = Customer(
            name='fake',
            email='fake@fake.com',
            shipping_address='fake',
            billing_address='fake'
        )
        self.order = Order(self.customer)

    def test_create_payment_instance(self):
        '''
        Should create a new valid instance of Costumer
        '''
        payment = Payment(
            order=self.order,
            payment_method='credit_card'
        )
        self.assertIsInstance(payment, Payment)

    def test_create_payment_instance_without_required_args(self):
        '''
        Should raise TypeError:
        __init__() missing 2 required positional arguments:
        'order' and 'payment_method'

        '''
        with self.assertRaises(TypeError):
            Payment()

    def test_payment_pay_behavior(self):
        '''
        paid_at should not be None
        '''
        payment = Payment(
            order=self.order,
            payment_method='credit_card'
        )
        payment.pay()
        self.assertNotEqual(payment.paid_at, None)
