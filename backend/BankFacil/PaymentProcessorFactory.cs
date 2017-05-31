using System;

namespace BankFacil
{
    public class PaymentProcessorFactory
    {
        public IPaymentProcessor Build(Product product)
        {
            //TODO: instanciar via D.I.
            var attributes = product.GetType().GetCustomAttributes(typeof(PaymentProcessorAttribute), inherit: false);
            if (attributes.Length == 0)
                throw new InvalidOperationException("Could not retrieve Payment Processor.");
            var attr = attributes[0] as PaymentProcessorAttribute;
            return (IPaymentProcessor) Activator.CreateInstance(attr.ProcessorType);
        }
    }
}
