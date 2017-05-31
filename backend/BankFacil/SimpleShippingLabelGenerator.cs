using System;

namespace BankFacil
{
    public class SimpleShippingLabelGenerator : IShippingLabelGenerator
    {
        public void Generate(Payment payment, OrderItem item)
        {
            throw new NotImplementedException();
        }
    }
}
