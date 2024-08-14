package fixtures

import org.example.dtos.Customer

class CustomerFixture{
    val customer = Customer(
        isMember = false,
        email = "batata@gmail.com"
    )

    val nonMemberCustomer = Customer(
        isMember = true,
        email = "batata@gmail.com"
    )
}