using System;

namespace BankFacil
{
    public class Payment
    {
        public long AuthorizationNumber { get; private set; }
        public decimal Amount { get; private set; }
        public Invoice Invoice { get; private set; }
        public Order Order { get; }
        public PaymentMethod PaymentMethod { get; }
        public DateTime? PaidAt { get; private set; }

        public Payment(long authorizationNumber,
            decimal amount,
            Invoice invoice,
            Order order,
            PaymentMethod paymentMethod)
        {
            AuthorizationNumber = authorizationNumber;
            Amount = amount;
            Invoice = invoice;
            Order = order;
            PaymentMethod = paymentMethod;
        }

        public void Pay(DateTime? paidAt = null)
        {
            paidAt = paidAt ?? DateTime.Now;

            Amount = Order.TotalAmount;
            AuthorizationNumber = DateTime.Now.Ticks;
            Invoice = new Invoice(Order.Address, Order.Address, Order);
            PaidAt = paidAt;
        }

        public bool Paid => PaidAt.HasValue;
    }
}
