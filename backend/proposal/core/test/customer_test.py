import unittest
from core.customer import Customer

class TestCustomer(unittest.TestCase):
    # Testing craeting customer
    def test_creation(self):
        customer = Customer("test@test.com")
        self.assertEqual(customer.email, "test@test.com")

if __name__ == "__main__":
    unittest.main()
