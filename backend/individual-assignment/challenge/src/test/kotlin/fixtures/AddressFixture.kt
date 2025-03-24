package fixtures

import org.example.dtos.Address

class AddressFixture {
    val address = Address(
        street = "somewhere"
    )

    val invalidAddress = Address(
        street = "nowhere"
    )
}