package br.com.jsc.challenge.domain

enum class ProductType {
    PHYSICAL,
    BOOK,
    DIGITAL,
    MEMBERSHIP
}

data class Product(val name: String, val type: ProductType, val price: Double)