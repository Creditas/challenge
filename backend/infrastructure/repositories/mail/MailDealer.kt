package challenge.infrastructure.repositories.mail

class MailDealer {
    companion object {
        @JvmStatic
        fun sendMail(to: String, mailText: String) {}

        @JvmStatic
        fun sendVoucher(to: String, value: Double, mailText: String) {}
    }
}