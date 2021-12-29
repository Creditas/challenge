<?php

namespace Creditas;

class Customer {
  public $income;

  public function __construct($income) {
    $this->income = $income;
  }
}