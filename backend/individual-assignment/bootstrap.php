<?php

namespace App\Models;

use Exception;
use DateTime;

class Order
{
    public $customer;
    public $address;
    public $items = [];
    public $closedAt = null;
    public $payment = null;

    public function __construct(Customer $customer, Address $address)
    {
        $this->customer = $customer;
        $this->address = $address;
    }

    public function getTotalAmount()
    {
        return array_reduce($this->items, function ($sum, OrderItem $item) {
            return $sum + $item->getTotal();
        }, 0);
    }

    public function addProduct(Product $product, int $quantity)
    {
        foreach ($this->items as $item) {
            if ($item->getProduct() === $product) {
                throw new Exception("The product has already been added. Change the amount if you want more.");
            }
        }

        $this->items[] = new OrderItem($product, $quantity);
    }

    public function pay(PaymentMethod $method)
    {
        if ($this->payment) {
            throw new Exception("The order has already been paid!");
        }

        if (count($this->items) === 0) {
            throw new Exception("Empty order cannot be paid!");
        }

        $this->payment = new Payment($this, $method);
        $this->close();
    }

    public function close()
    {
        $this->closedAt = new DateTime();
    }
}

class OrderItem
{
    public $product;
    public $quantity;

    public function __construct(Product $product, int $quantity)
    {
        $this->product = $product;
        $this->quantity = $quantity;
    }

    public function getTotal()
    {
        return $this->product->getPrice() * $this->quantity;
    }

    public function getProduct()
    {
        return $this->product;
    }
}

class Payment
{
    public $paidAt;
    public $authorizationNumber;
    public $amount;
    public $invoice;

    public function __construct(Order $order, PaymentMethod $paymentMethod)
    {
        $this->paidAt = new DateTime();
        $this->authorizationNumber = $this->paidAt->getTimestamp();
        $this->amount = $order->getTotalAmount();
        $this->invoice = new Invoice($order);
    }
}

class CreditCard implements PaymentMethod
{
    public $number;

    public function __construct(string $number)
    {
        $this->number = $number;
    }
}

interface PaymentMethod
{
}

class Invoice
{
    public $billingAddress;
    public $shippingAddress;

    public function __construct(Order $order)
    {
        $this->billingAddress = $order->address;
        $this->shippingAddress = $order->address;
    }
}

class Product
{
    public $name;
    public $type;
    public $price;

    public function __construct(string $name, string $type, float $price)
    {
        $this->name = $name;
        $this->type = $type;
        $this->price = $price;
    }

    public function getPrice()
    {
        return $this->price;
    }
}

class Address
{
}

class Customer
{
}

// Exemplo de uso
$shirt = new Product("Flowered t-shirt", 'PHYSICAL', 35.00);
$netflix = new Product("Familiar plan", 'MEMBERSHIP', 29.90);
$book = new Product("The Hitchhiker's Guide to the Galaxy", 'BOOK', 120.00);
$music = new Product("Stairway to Heaven", 'DIGITAL', 5.00);

$order = new Order(new Customer(), new Address());

$order->addProduct($shirt, 2);
$order->addProduct($netflix, 1);
$order->addProduct($book, 1);
$order->addProduct($music, 1);

$order->pay(new CreditCard("43567890-987654367"));
// now, how to deal with shipping rules then?
