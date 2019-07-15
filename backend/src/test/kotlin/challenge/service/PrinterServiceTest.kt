package challenge.service

import challenge.entity.BaseTest
import org.junit.jupiter.api.Test
import kotlin.test.junit5.JUnit5Asserter

internal class PrinterServiceTest : BaseTest() {

    @Test
    fun `Assert instance is not null`() {
        JUnit5Asserter.assertNotNull(actual = PrinterService.instance, message = null)
    }

    @org.junit.jupiter.api.Test
    fun `Assert instance is always the same`() {
        JUnit5Asserter.assertSame(actual = PrinterService.instance, expected = PrinterService.instance, message = null)
    }

}
