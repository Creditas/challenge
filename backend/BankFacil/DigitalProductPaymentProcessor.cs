using System;

namespace BankFacil
{
    public class DigitalProductPaymentProcessor : IPaymentProcessor
    {
        private readonly IEmailSender emailSender;
        private readonly IVoucherManager voucherManager;

        public DigitalProductPaymentProcessor()
        {
            emailSender = new EmailSender();
            voucherManager = new VoucherManager();
        }

        public DigitalProductPaymentProcessor(IEmailSender emailSender,
            IVoucherManager voucherManager)
        {
            this.emailSender = emailSender;
            this.voucherManager = voucherManager;
        }

        public void Process(Payment payment, OrderItem item)
        {
            voucherManager.GrantDiscount(payment.Order.Customer, .10M);
            string message = BuildProductDescriptionMessage(payment, item);
            emailSender.Send(payment.Order.Customer.EmailAddress, "Payment confirmation", message);
        }

        private string BuildProductDescriptionMessage(Payment payment, OrderItem item)
        {
            //TODO: construir body do email
            return string.Empty;
        }
    }
}
