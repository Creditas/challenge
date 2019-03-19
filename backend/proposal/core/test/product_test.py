import unittest
from core.product import Product

class TestProduct(unittest.TestCase):
    # Testing creating product
    def test_creation(self):
        product = Product("test name", "book")
        self.assertEqual(product.name, "test name")
        self.assertEqual(product.type, "book")
    
if __name__ == "__main__":
    unittest.main()
