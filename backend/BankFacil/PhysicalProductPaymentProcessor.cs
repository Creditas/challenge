using System;

namespace BankFacil
{
    public class PhysicalProductPaymentProcessor : IPaymentProcessor
    {
        private readonly IShippingLabelGenerator shippingLabelGenerator;

        public PhysicalProductPaymentProcessor()
        {
            shippingLabelGenerator = new SimpleShippingLabelGenerator();
        }

        public PhysicalProductPaymentProcessor(IShippingLabelGenerator shippingLabelGenerator)
        {
            this.shippingLabelGenerator = shippingLabelGenerator;
        }

        public void Process(Payment payment, OrderItem item)
        {
            shippingLabelGenerator.Generate(payment, item);
        }
    }
}
