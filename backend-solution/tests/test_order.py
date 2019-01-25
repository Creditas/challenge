from unittest import TestCase, main
from tests.helpers.products import physic_product, digital_product
from tests.helpers.customer import customer_macabeus
from customer import Customer
from order import Order


order = Order(
    products=[physic_product],
    customer=customer_macabeus
)


class TestOrder(TestCase):
    def test_should_can_create_an_order(self):
        assert len(order.products) == 1, 'Should has just an one product'
        assert order.products[0] == physic_product, \
            'Should has the product "physic_product"'

    def test_generate_shipping_label(self):
        shipping_labels = order.generate_shipping_labels()

        assert len(shipping_labels) == len(order.products), \
            'Should has the same amount of shipping label as has the products'

    def test_pay_physic_and_digital_products(self):
        initial_wallet = 500
        customer = Customer(
            name='macabeus',
            wallet=initial_wallet
        )

        order_two_products = Order(
            products=[physic_product, digital_product],
            customer=customer
        )

        order_two_products.pay()

        assert customer.wallet == \
            initial_wallet - physic_product.price - digital_product.price, \
            'Should cash the wallet'
        assert customer.email_messages[0] == 'discount voucher R$ 10', \
            'Should receive a voucher because purchased a digital product'

    def test_pay_physic_product(self):
        initial_wallet = 500
        customer = Customer(
            name='macabeus',
            wallet=initial_wallet
        )

        order_one_product = Order(
            products=[physic_product],
            customer=customer
        )

        order_one_product.pay()

        assert customer.wallet == initial_wallet - physic_product.price, \
            'Should cash the wallet'
        assert len(customer.email_messages) == 0, \
            'Should not send any email'


if __name__ == '__main__':
    main()
