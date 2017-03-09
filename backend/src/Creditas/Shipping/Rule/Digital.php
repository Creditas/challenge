<?php

namespace Creditas\Shipping\Rule;

use Creditas\Shipping\Entity\Payment;
use Creditas\Shipping\Enum\Messages;
use Creditas\Service\ServiceLocator;

class Digital implements RuleInterface
{
    public function process(Payment $payment)
    {
        $order = $payment->getOrder();

        // notify order
        ServiceLocator::get('notifier')->notifyCustomerOrder($customer, $order);

        $customer = $payment->order->customer;

        // apply voucher to customer
        ServiceLocator::get('voucher')->apply($customer);
    }
}
