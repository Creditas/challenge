namespace BankFacil
{
    [PaymentProcessor(typeof(DigitalProductPaymentProcessor))]
    public class DigitalProduct : Product
    {
        public DigitalProduct(string name) : base(name)
        {
        }
    }
}
