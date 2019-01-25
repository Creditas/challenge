from unittest import TestCase, main
from tests.helpers.products import physic_product
from shipping_label import ShippingLabel


class TestShippingLabel(TestCase):
    def test_should_can_create_a_shipping_label(self):
        shipping_label = ShippingLabel(
            product=physic_product
        )

        assert shipping_label.product == physic_product, \
            'Should set the product as the physic_product'


if __name__ == '__main__':
    main()
