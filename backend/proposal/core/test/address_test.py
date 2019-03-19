import unittest
from core.address import Address

class TestAddress(unittest.TestCase):
    # Testing if address is created correctly
    def test_creation(self):
        address = Address('01420001')
        self.assertEqual(address.zipcode, '01420001')

if __name__ == '__main__':
    unittest.main()
