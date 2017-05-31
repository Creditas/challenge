using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Linq;

namespace CreditasChallenge
{
    [TestClass]
    public class Tests
    {
        readonly Product shirt = new Product(19.90m, new Physical());
        readonly Product netflix = new Product(30, new Membership());
        readonly Product book = new Product(80, new Book());
        readonly Product music = new Product(2.99m, new Digital());

        [TestMethod]
        public void OrderAndPaymentMustBeClosed()
        {
            var order = new Order(new Customer(), new Address());
            order.AddProduct(shirt);
         
            order.Pay(new CreditCard());

            Assert.IsTrue(order.ClosedAt.HasValue);
            Assert.IsTrue(order.Payment.PaidAt.HasValue);
        }

        [TestMethod]
        public void OrderShouldHave4ItemsAndTheRightTotalAmount()
        {
            var order = new Order(new Customer(), new Address());
            order.AddProduct(shirt, 2);
            order.AddProduct(netflix);
            order.AddProduct(book);
            order.AddProduct(music);

            DomainEvents.EventsRaised = new List<Event>();

            order.Pay(new CreditCard());

            Assert.AreEqual(order.Items.Count, 4);
            Assert.AreEqual(order.TotalAmount, shirt.Price * 2 + netflix.Price + book.Price + music.Price); 
        }

        [TestMethod]
        public void OrderShouldRise4DomainEvents()
        {
            var order = new Order(new Customer(), new Address());
            order.AddProduct(shirt, 2);
            order.AddProduct(netflix);
            order.AddProduct(book);
            order.AddProduct(music);

            DomainEvents.EventsRaised = new List<Event>();

            order.Pay(new CreditCard());

            Assert.IsInstanceOfType(DomainEvents.EventsRaised[0], typeof(PhysicalProductPurchased));
            Assert.IsInstanceOfType(DomainEvents.EventsRaised[1], typeof(MembershipProductPurchased));
            Assert.IsInstanceOfType(DomainEvents.EventsRaised[2], typeof(PhysicalProductPurchased));
            Assert.IsInstanceOfType(DomainEvents.EventsRaised[3], typeof(DigitalProductPurchased));
        }

        [TestMethod]
        public void OrderPhysicalProductMustGenerateShippingLabel()
        {
            var order = new Order(new Customer(), new Address());
            order.AddProduct(shirt);

            order.Pay(new CreditCard());

            Assert.IsNull(order.Items.Single().ShippingLabel.Notification);
        }

        [TestMethod]
        public void OrderBookMustGenerateShippingLabelFreeOfCharges()
        {
            var order = new Order(new Customer(), new Address());
            order.AddProduct(book);

            order.Pay(new CreditCard());

            Assert.IsNotNull(order.Items.Single().ShippingLabel.Notification);
        }

        [TestMethod]
        public void OrderMustGenerateAVoucherForCustomer()
        {
            var customer = new Customer();
            var order = new Order(customer, new Address());
            order.AddProduct(music);

            order.Pay(new CreditCard());

            Assert.IsTrue(order.Customer.Vouchers.Count == 1);
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidOperationException))]
        public void OrderCantHaveMultipleItemsWithTheSameProduct()
        {
            var order = new Order(new Customer(), new Address());
            order.AddProduct(book);
            order.AddProduct(book);
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidOperationException))]
        public void OrderCantBePaidTwice()
        {
            var order = new Order(new Customer(), new Address());
            order.AddProduct(book);

            order.Pay(new CreditCard());
            order.Pay(new CreditCard());
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidOperationException))]
        public void OrderWithoutItemsCantBePaid()
        {
            var order = new Order(new Customer(), new Address());

            order.Pay(new CreditCard());
        }
    }
}
