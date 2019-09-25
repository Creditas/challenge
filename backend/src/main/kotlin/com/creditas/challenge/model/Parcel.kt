package com.creditas.challenge.model

data class Parcel(val items: List<Item>,
                  val shippingAddress: Address,
                  val shippingLabel: ShippingLabel) {

}

enum class ShippingLabel(val desc: String = "") {
    TAX_FREE("Isento de impostos conforme disposto na Constituição Art. 150, VI, d."),
    DEFAULT
}