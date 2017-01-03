namespace BankFacil
{
    public interface IPaymentProcessor
    {
        void Process(Payment payment, OrderItem item);
    }
}
