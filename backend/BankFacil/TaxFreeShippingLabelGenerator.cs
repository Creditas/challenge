using System;

namespace BankFacil
{
    public class TaxFreeShippingLabelGenerator : ITaxFreeShippingLabelGenerator
    {
        public void Generate(Payment payment, OrderItem item)
        {
            throw new NotImplementedException();
        }
    }
}
