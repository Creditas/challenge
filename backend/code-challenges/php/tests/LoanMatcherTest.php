<?php

use PHPUnit\Framework\TestCase;
use Creditas\Customer;
use Creditas\LoanMatcher;

final class LoanMatcherTest extends TestCase
{
    public function testLoanMatcher(): void
    {
        $customer = new Customer(3000, 123);
        $loanMatcher = new LoanMatcher($customer);
        $availableLoans = $loanMatcher->getLoansFromCustomer();

        $this->assertCount(1, $availableLoans);
        $this->assertEquals('EMPRESTIMO_PESSOAL', $availableLoans[0]->loanType);
    }
}