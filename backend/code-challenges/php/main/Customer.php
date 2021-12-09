<?php

namespace Creditas;

class Customer {
  private $income;

  public function __construct($income) {
    $this->income = $income;
  }
}