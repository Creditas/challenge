import { ProductType } from '../models/enum/ProductType';

export class Product {
    constructor(
        public name: string, 
        public type: ProductType, 
        public price: number) {}
}
