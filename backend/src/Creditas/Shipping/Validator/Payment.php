<?php

namespace Creditas\Payment\Validator;

use Creditas\Entity\Payment as PaymentEntity;
use Creditas\Exception\ValidatorException;

class Payment implements ValidatorInterface
{
    public function validate(ValidatorInterface $payment)
    {
        // @TODO: validate payment data or throws ValidatorException
    }
}
