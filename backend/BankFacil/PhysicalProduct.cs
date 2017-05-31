namespace BankFacil
{
    [PaymentProcessor(typeof(PhysicalProductPaymentProcessor))]
    public class PhysicalProduct : Product
    {
        public PhysicalProduct(string name) : base(name)
        {
        }
    }
}
