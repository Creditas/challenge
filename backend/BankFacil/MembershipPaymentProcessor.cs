using System;

namespace BankFacil
{
    public class MembershipPaymentProcessor : IPaymentProcessor
    {
        private readonly IMembershipManager membershipManager;
        private readonly IEmailSender emailSender;

        public MembershipPaymentProcessor()
        {
            membershipManager = new MembershipManager();
            emailSender = new EmailSender();
        }

        public MembershipPaymentProcessor(IMembershipManager membershipManager,
            IEmailSender emailService)
        {
            this.membershipManager = membershipManager;
            this.emailSender = emailService;
        }

        public void Process(Payment payment, OrderItem item)
        {
            membershipManager.ActivateMembership(item);
            string message = BuildMembershipNotificationMessage(payment, item);
            emailSender.Send(payment.Order.Customer.EmailAddress, "Notification", message);
        }

        private string BuildMembershipNotificationMessage(Payment payment, OrderItem item)
        {
            //TODO: construir body do email
            return string.Empty;
        }
    }
}
