namespace BankFacil
{
    public class CreditCard : PaymentMethod
    {
        public CreditCard FetchByHashed(string code)
        {
            return new CreditCard();
        }
    }
}
