<?php

namespace Creditas;

use Creditas\Customer;

class LoanMatcher {
  private $customer;

  public function __construct(Customer $customer) {
    $this->customer = $customer;
  }

  public function getLoansFromCustomer() {
    $loans = [];
    return $loans;
  }
}