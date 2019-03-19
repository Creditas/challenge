import unittest
from core.credit_card import CreditCard

class TestCreditCard(unittest.TestCase):
    # Testing if credit card fetch_by_hashed returns a CreditCard
    def test_creation(self):
        self.assertIsInstance(CreditCard.fetch_by_hashed('12345'), CreditCard)

if __name__ == '__main__':
    unittest.main()
