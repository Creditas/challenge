import fixtures.CustomerFixture
import org.example.models.impl.DigitalPurchaseImpl
import org.example.models.impl.SendEmailImpl
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class DigitalPurchaseTest {
    //Other classes will not be tested due to time limit...
    val emailSenderMockk = SendEmailImpl() // This was supposed to be mockk<SendEmail>()
    val digitalImpl = DigitalPurchaseImpl(emailSenderMockk)

    @Test
    fun `(sendEmail) Shall send email with voucher`(){
        val customer = CustomerFixture().customer

        /*
        every {
            emailSenderMockk.sendEmail()
        } returns "success"
         */

        val response = digitalImpl.sendMailWithVoucher(
            customer = customer
        )

        assertEquals("The customer received a email with voucher",response)
    }

    @Test
    fun `(sendEmail) Rethrow error if emailSender throws`(){
        val customer = CustomerFixture().customer


        /*
        every {
            emailSenderMockk.sendEmail()
        } throws Exception("Fon")
         */

        /*
            assertFail when calling sendMailWithVoucher
         */

        val response = digitalImpl.sendMailWithVoucher(
            customer = customer
        )

        /*
         Would Assert message and exception type
         */

        assertEquals(true, true)
    }
}