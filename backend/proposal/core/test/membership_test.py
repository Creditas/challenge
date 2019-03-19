import unittest
import time
from core.customer import Customer
from core.membership import Membership

class TestMembership(unittest.TestCase):
    # Testing if membership is created correctly
    def test_creation(self):
        customer = Customer("test@test.com")
        membership = Membership(customer)
        self.assertEqual(membership.customer, customer)
        self.assertEqual(membership.activated_at, None)
    
    # Testing if membership is activated
    def test_activate(self):
        customer = Customer("test@test.com")
        membership = Membership(customer)
        activate_time = time.time()
        # Activating at a given time
        membership.activate(activate_time)
        self.assertEqual(membership.activated_at, activate_time)

if __name__ == '__main__':
    unittest.main()
