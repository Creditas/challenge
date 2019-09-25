package com.creditas.challenge.model

interface Order {

    val items: List<Item>
    val account: Account
}

class PhysicalOrder(override val items: List<Item>,
                    override val account: Account) : Order {

}

class DigitalOrder(override val items: List<Item>,
                   override val account: Account) : Order {

}

class MembershipOrder(override val items: List<Item>,
                      override val account: Account) : Order {

    constructor(item: Item, account: Account): this(listOf(item), account)

}
