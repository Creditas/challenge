package org.example.dtos

import org.example.enums.ProductType

data class Product(
    val name: String,
    val type: ProductType,
    val price: Double
)
