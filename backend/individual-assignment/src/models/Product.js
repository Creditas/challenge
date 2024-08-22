"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.ProductType = void 0;
var ProductType;
(function (ProductType) {
    ProductType["PHYSICAL"] = "PHYSICAL";
    ProductType["BOOK"] = "BOOK";
    ProductType["DIGITAL"] = "DIGITAL";
    ProductType["MEMBERSHIP"] = "MEMBERSHIP";
})(ProductType || (exports.ProductType = ProductType = {}));
class Product {
    constructor(name, type, price) {
        this.name = name;
        this.type = type;
        this.price = price;
    }
}
exports.Product = Product;
