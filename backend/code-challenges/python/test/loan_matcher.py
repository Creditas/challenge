from unittest import TestCase

from challenge.customer import Customer
from challenge.loan_matcher import loan_matcher

class LoanMatcherTest(TestCase):

    def test_returns_personal_loan_when_customer_income_is_under_3000(self):
        customer = Customer(3000)

        available_loans = loan_matcher(customer)

        assert len(available_loans) == 1
        assert available_loans[0].loan_type == 'EMPRESTIMO_PESSOAL'
