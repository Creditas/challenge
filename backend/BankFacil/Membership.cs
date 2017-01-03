namespace BankFacil
{
    [PaymentProcessor(typeof(MembershipPaymentProcessor))]
    public class Membership : Product
    {
        public Membership(string name) : base(name)
        {
        }
    }
}
