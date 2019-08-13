package domain.product

import domain.shipment.ShipmentStrategy

abstract class Product {

    abstract val price: Double

    abstract fun shipmentStrategy() : ShipmentStrategy
}




