package challenge.service

import challenge.entity.BaseTest
import org.junit.jupiter.api.Test
import kotlin.test.junit5.JUnit5Asserter

internal class EmailServiceTest : BaseTest() {

    @Test
    fun `Assert instance is not null`() {
        JUnit5Asserter.assertNotNull(actual = EmailService.instance, message = null)
    }

    @org.junit.jupiter.api.Test
    fun `Assert instance is always the same`() {
        JUnit5Asserter.assertSame(actual = EmailService.instance, expected = EmailService.instance, message = null)
    }

}

