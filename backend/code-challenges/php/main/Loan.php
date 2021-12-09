<?php

namespace Creditas;

class Loan {
  private $type;

  public function __construct($type) {
    $this->type = $type;
  }
}