namespace BankFacil
{
    public class PaymentHandler
    {
        public void Handle(Payment payment)
        {
            var factory = new PaymentProcessorFactory();
            foreach (var item in payment.Order.Items)
            {
                var processor = factory.Build(item.Product);
                processor.Process(payment, item);
            }
        }
    }
}
