using System;
using System.Collections.Generic;
using System.Linq;

namespace BankFacil
{
    public class Order
    {
        public Customer Customer { get; }
        public IList<OrderItem> Items { get; }
        public Address Address { get; }
        public DateTime ClosedAt { get; private set; }

        public Order(Customer customer, Address address)
        {
            Customer = customer;
            Items = new List<OrderItem>();
            Address = address ?? new Address("45678-979");
        }

        public void AddProduct(Product product)
        {
            Items.Add(new OrderItem(this, product));
        }

        public int TotalAmount => Items.Sum(x => x.Total);

        public void Close(DateTime? closedAt = null)
        {
            ClosedAt = closedAt ?? DateTime.Now;
        }
    }
}
