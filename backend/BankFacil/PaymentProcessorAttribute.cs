using System;

namespace BankFacil
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    public class PaymentProcessorAttribute : Attribute
    {
        public Type ProcessorType { get; }

        public PaymentProcessorAttribute(Type processorType)
        {
            if (!(processorType is IPaymentProcessor))
                throw new ArgumentException("Provided type must implement IPaymentProcessor.");

            ProcessorType = processorType;
        }
    }
}
