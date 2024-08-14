package fixtures

import org.example.models.impl.Order

class OrderFixture {
    val order = Order(
        customer = CustomerFixture().customer,
        address = AddressFixture().address
    )

    val memberOrder = Order(
        customer = CustomerFixture().nonMemberCustomer,
        address = AddressFixture().address
    )

    val invalidAddressOrder = Order(
        customer = CustomerFixture().nonMemberCustomer,
        address = AddressFixture().invalidAddress
    )
}