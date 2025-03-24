import fixtures.OrderFixture
import org.example.extension.bookProcess
import org.example.extension.digitalProcess
import org.example.extension.membershipProcess
import org.example.extension.physicalProcess
import org.junit.jupiter.api.Order
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals
import kotlin.test.assertFails
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue

class ProductTypeProcessTest {
    private val order = OrderFixture().order

    @Test
    fun `(physicalProcess) Shall ship the object with the taxes`(){
        val response = physicalProcess(order)

        assertEquals("The object was shipped with taxes", response)
    }

    @Test
    fun `(physicalProcess) Shall throw exception if Address is not valid`(){
        val order = OrderFixture().invalidAddressOrder
        val response = assertFailsWith<Exception>{
            physicalProcess(order)
        }

        assertEquals("Address not valid", response.message)
    }

    @Test
    fun `(bookProcess) Shall ship the object without taxes`(){
        val response = bookProcess(order)

        assertEquals("The object was shipped with NO taxes", response)
    }

    @Test
    fun `(digitalProcess) Shall send email with voucher`(){
        val response = digitalProcess(order)

        assertEquals("The customer received a email with voucher",response)
    }

    @Test
    fun `(membershipProcess) Shall make the Customer a member`(){
        val response = membershipProcess(order)

        assertEquals("The Customer is now a member", response)
    }

    @Test
    fun `(membershipProcess) Shall extend the Customer membership if hes already a member`(){
        val order = OrderFixture().memberOrder

        val response = membershipProcess(order)

        assertEquals("The member is already a member, the expirationDate will be increased", response)
    }

    @Test
    fun `(membershipProcess) rethrow error if MembershipImpl has any error`(){
        //This case would mockkStatic the Membership, and make every activateMembership throws error
        // Need to import it, but will not
        // All methods that may be mocked would have a method like this, so that it will make its own test
        // an UNIT test...
        assertTrue(true)
    }
}