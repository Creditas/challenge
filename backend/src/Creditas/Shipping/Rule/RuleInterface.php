<?php

namespace Creditas\Shipping\PaymentMethod;

class Default implements PaymentMethodInterface
{
    public function process(Payment $payment)
    {
        // send shipping label

        // notify user
    }
}
