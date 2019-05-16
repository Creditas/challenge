import main.challenge.domain.PhysicalItemProcessingStrategy
import main.challenge.domain.Product
import main.challenge.domain.ProductType
import main.challenge.domain.createOrderItemProcessorFromProductType
import org.spekframework.spek2.Spek
import org.spekframework.spek2.style.specification.describe
import kotlin.test.assertEquals

object ProductTests : Spek({
    describe("Product") {

        val physicalProduct by memoized { Product("Flowered t-shirt", ProductType.PHYSICAL, 35.00) }
        val bookProduct by memoized { Product("The Hitchhiker's Guide to the Galaxy", ProductType.BOOK, 55.00) }
        val digitalProduct by memoized { Product("Muse - Origin of simmetry", ProductType.BOOK, 120.00) }
        val membershippProduct by memoized { Product("Spotify Family", ProductType.MEMBERSHIP, 35.00) }

        it("physicalProduct should use PhysicalItemProcessingStrategy") {

            val orderProcessor =
                physicalProduct.type.createOrderItemProcessorFromProductType()

            assertEquals(orderProcessor::class, PhysicalItemProcessingStrategy::class)
        }
    }
})
