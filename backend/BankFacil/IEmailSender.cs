namespace BankFacil
{
    public interface IEmailSender
    {
        void Send(string to, string subject, string message);
    }
}
