namespace BankFacil
{
    public interface IShippingLabelGenerator
    {
        void Generate(Payment payment, OrderItem item);
    }

    public interface ITaxFreeShippingLabelGenerator : IShippingLabelGenerator
    {
    }
}
