using System;

namespace BankFacil
{
    public class BookPaymentProcessor : IPaymentProcessor
    {
        private readonly ITaxFreeShippingLabelGenerator shippingLabelGenerator;
        
        public BookPaymentProcessor()
        {
            shippingLabelGenerator = new TaxFreeShippingLabelGenerator();   //TODO: dependency injection
        }

        public BookPaymentProcessor(ITaxFreeShippingLabelGenerator shippingLabelGenerator)
        {
            this.shippingLabelGenerator = shippingLabelGenerator;
        }

        public void Process(Payment payment, OrderItem item)
        {
            shippingLabelGenerator.Generate(payment, item);
        }
    }
}
