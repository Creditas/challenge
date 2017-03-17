using System;
using System.Collections.Generic;
using System.Linq;

namespace CreditasChallenge
{
    public class Payment
    {
        public long AuthorizationNumber { get; private set; }
        public decimal TotalAmount { get; private set; }
        public Invoice Invoice { get; private set; }
        public PaymentMethod PaymentMethod { get; private set; }
        public DateTime? PaidAt { get; private set; }

        public Payment(Order order, PaymentMethod paymentMethod)
        {
            PaymentMethod = paymentMethod;
            AuthorizationNumber = DateTime.Now.Ticks;
            PaidAt = DateTime.Now;
            TotalAmount = order.TotalAmount;
            Invoice = new Invoice(order);
        }
    }

    public abstract class PaymentMethod { }
    
    public class CreditCard : PaymentMethod { }

    public class Invoice
    {
        public Address BillingAddress { get; private set; }
        public Address ShippingAddress { get; private set; }
        public Order Order { get; private set; }

        public Invoice(Order order)
        {
            BillingAddress = order.Address;
            ShippingAddress = order.Address;
            Order = order;
        }
    }

    public class Order
    {
        public Customer Customer { get; private set; }
        public Address Address { get; private set; }
        public List<OrderItem> Items { get; private set; }
        public Payment Payment { get; private set; }
        public DateTime? ClosedAt { get; private set; }

        public Order(Customer customer, Address address, List<OrderItem> items = null)
        {
            Customer = customer;
            Items = items ?? new List<OrderItem>();
            Address = address;
        }

        public decimal TotalAmount
        {
            get { return Items.Sum(item => item.Amount * item.Product.Price); }
        }

        public void AddProduct(Product product, int amount = 1)
        {
            var productAlreadyAdded = Items.Any(i => i.Product == product);
            if (productAlreadyAdded)
                throw new InvalidOperationException("The product have already been added. Change the amount if you want more.");

            Items.Add(new OrderItem(product, amount));
        }

        public void Pay(PaymentMethod method)
        {
            if (Payment != null)
                throw new InvalidOperationException("The order has already been paid!");

            if (Items.Count == 0)
                throw new InvalidOperationException("Empty order can not be paid!");

            Payment = new Payment(this, method);

            Deliver();
        }

        private void Deliver()
        {
            if (Payment.PaidAt == null)
                throw new InvalidOperationException("Order not paid!");
            
            Items.ForEach(i => i.Product.Type.ShippingRules(this, i.Product));

            Close();
        }

        private void Close()
        {
            ClosedAt = DateTime.Now;
        }
    }

    public class OrderItem
    {
        public Product Product { get; private set; } 
        public int Amount { get; set; }
        public ShippingLabel ShippingLabel { get; set; } 

        public OrderItem(Product product, int amount)
        {
            Product = product;
            Amount = amount;
        }
    }

    public class ShippingLabel
    {
        public string Notification { get; private set; }
        public ShippingLabel() { }
        public ShippingLabel(string notification)
        {
            Notification = notification;
        }
    }

    public class Product
    {
        public decimal Price { get; private set; }
        public ProductType Type { get; private set; }

        public Product(decimal price, ProductType type)
        {
            Price = price;
            Type = type;
        }
    }

    public abstract class ProductType
    {
        public abstract void ShippingRules(Order order, Product product);
    }

    public class Physical : ProductType
    {
        public virtual ShippingLabel GenerateShippingLabel()
        {
            return new ShippingLabel();
        }

        public override void ShippingRules(Order order, Product product)
        {
            var shippingLabel = GenerateShippingLabel();

            var item = order.Items.First(i => i.Product == product);
            item.ShippingLabel = shippingLabel;

            DomainEvents.Raise(new PhysicalProductPurchased(shippingLabel));
        }
    }

    public class Membership : ProductType
    {
        public override void ShippingRules(Order order, Product product)
        {
            DomainEvents.Raise(new MembershipProductPurchased(order.Customer, product));
        }
    }

    public class Book : Physical
    {
        public override ShippingLabel GenerateShippingLabel()
        {
            return new ShippingLabel("Product free of charge as provided in the brazilian constitution Art. 150, VI, d.");
        }
    }

    public class Digital : ProductType
    {
        public override void ShippingRules(Order order, Product product)
        {
            DomainEvents.Raise(new DigitalProductPurchased(order.Customer, product));

            order.Customer.AddVoucher(new Voucher(10));
        }
    }

    public class Customer
    {
        public List<Voucher> Vouchers { get; private set; } = new List<Voucher>();

        public void AddVoucher(Voucher voucher)
        {
            Vouchers.Add(voucher);
        }
    }

    public class Voucher
    {
        public Voucher(int value) { }
    }

    public class Address { }

    //Esboço de implementação de domain events - Apenas pro código acima funcionar (comentário sobre isso no readme)
    public static class DomainEvents
    {
        public static List<Event> EventsRaised { get; set; } = new List<Event>(); 
        public static void Raise(Event Event)
        {
            //Essa lista é utilizada apenas para teste
            EventsRaised.Add(Event); 
        }
    }

    public class Event { }

    public class PhysicalProductPurchased : Event
    {
        public PhysicalProductPurchased(ShippingLabel shippingLabel) { }
    }

    public class MembershipProductPurchased : Event
    {
        public MembershipProductPurchased(Customer customer, Product product) { }
    }

    public class DigitalProductPurchased : Event
    {
        public DigitalProductPurchased(Customer customer, Product product) { }
    }
}
