import unittest
from core.product import Product

class TestProduct(unittest.TestCase):
    # Testing creating product
    def test_creation(self):
        product = Product("test name", "book")
        self.assertEqual(product.name, "test name")
        self.assertEqual(product.type, "book")
    
    def test_creating_invalid_type(self):
        self.assertRaises(ValueError, Product, "test name", "invalid type")
    
if __name__ == "__main__":
    unittest.main()
