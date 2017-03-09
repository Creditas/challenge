<?php

namespace Creditas\Shipping\Service;

use Creditas\Shipping\Enum\Messages;

class Label
{
    public function generate(Payment $payment, $noTax = false)
    {
        $message = Messages::SHIPPING_LABEL_DEFAULT;

        if ($noTax) {
            $message = Messages::SHIPPING_LABEL_NO_TAX;
        }

        // @TODO: generate shipping label with message
    }    
}
