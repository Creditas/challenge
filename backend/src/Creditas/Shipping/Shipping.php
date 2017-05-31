<?php

namespace Creditas\Shipping;

use Entity\Payment as PaymentValidator;
use RuntimeException;

class Shipping
{
    private $validator;

    public function __construct()
    {
        $this->validator = new PaymentValidator $validator;
    }

    public function process(Payment $payment, $type)
    {
        try {
            $this->validator->validate($payment);
        } catch (ValidatorException $e) {
            // @TODO: log/return error
        }

        $this->getRule($type)->process($payment);
    }

    // @TODO: high coupling, must be refactored
    private function getRule($type)
    {
        $className = __namespace__ . "\\Rule\\" . ucfirst($type);

        if (!class_exists($className)) {
            throw new RuntimeException(sprintf('Invalid payment method type: %s', $type));
        }

        $classInstance = new $className;

        if (!$classInstance instanceof RuleInterface) {
            throw new RuntimeException('Rule Class must implements RuleInterface.');
        }

        return $classInstance;
    }
}
