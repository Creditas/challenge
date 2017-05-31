namespace BankFacil
{
    [PaymentProcessor(typeof(BookPaymentProcessor))]
    public class Book : Product
    {
        public Book(string name) : base(name)
        {
        }
    }
}
