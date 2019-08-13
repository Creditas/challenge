package domain.product

import domain.shipment.ShipmentStrategy

abstract class Product {

    abstract fun shipmentStrategy() : ShipmentStrategy
}




