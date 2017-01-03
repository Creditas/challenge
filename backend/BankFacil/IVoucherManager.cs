namespace BankFacil
{
    public interface IVoucherManager
    {
        void GrantDiscount(Customer customer, decimal value);
    }
}
