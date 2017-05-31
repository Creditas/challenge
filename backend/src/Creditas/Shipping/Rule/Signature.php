<?php

namespace Creditas\Shipping\Rule;

use Creditas\Shipping\Entity\Payment;
use Creditas\Shipping\Enum\Messages;
use Creditas\Service\ServiceLocator;

class Signature implements RuleInterface
{
    public function process(Payment $payment)
    {
        $customer = $payment->order->customer;

        // activate signature
        ServiceLocator::get('signature')->activate($customer);

        // notify customer
        ServiceLocator::get('notifier')->noitfyActivation($customer);
    }
}
