from unittest import TestCase, main
from tests.helpers.products import physic_product
from tests.helpers.customer import customer_macabeus
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


if __name__ == '__main__':
    main()
