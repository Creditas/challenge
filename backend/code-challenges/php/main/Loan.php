<?php

namespace Creditas;

class Loan {
  public $type;

  public function __construct($type) {
    $this->type = $type;
  }
}