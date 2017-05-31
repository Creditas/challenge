namespace BankFacil
{
    public class Invoice
    {
        public Address BillingAddress { get; }
        public Address ShippingAddress { get; }
        public Order Order { get; }

        public Invoice(Address billingAddress,
            Address shippingAddress,
            Order order)
        {
            BillingAddress = billingAddress;
            ShippingAddress = shippingAddress;
            Order = order;
        }
    }
}
