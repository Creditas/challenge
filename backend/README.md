# Creditas Coding Challenge

As for this, I sought to replicate, to the best of my knowledge, how I imagine the big players in e-Commerce platforms 
would handle different types of Orders (Physical, Digital and Subscriptions) based on what the customer has on their
Shopping Cart when they do checkout.


Language: Kotlin


## Up and Running

**Requirements**
- JDK 8+ (also tested with OpenJDK11 :heavy_check_mark:)
- Gradle

**Building**
```
./gradlew build
```

**Testing**
```
./gradlew test
```

## Usage
```kotlin

fun main() {
    val shoppingCart = ShoppingCart()
        .add(Product("PS4 Slim 1TB", ProductType.PHYSICAL, 1899.00), 1)
        .add(Product("PDP Chair", ProductType.PHYSICAL, 399.00), 2)
        .add(Product("Cracking the Code Interview", ProductType.PHYSICAL_TAX_FREE, 219.57), 2)
        .add(Product("The Hitchhiker's Guide to the Galaxy", ProductType.PHYSICAL_TAX_FREE, 120.00), 1)
        .add(Product("Stairway to Heaven", ProductType.DIGITAL, 5.00), 1)
        .add(Product("Nier:Automata", ProductType.DIGITAL, 129.90), 4)
        .add(Product("Netflix Familiar Plan", ProductType.SUBSCRIPTION, 29.90), 1)
        .add(Product("Spotify Premium", ProductType.SUBSCRIPTION, 14.90), 1)
        .add(Product("Amazon Prime", ProductType.SUBSCRIPTION, 12.90), 1)

    val account = Account("john doe", "john.doe@gmail.com", "passwd")
    val orders = shoppingCart.checkout(account)

    // Pick one or Iterate through the orders
    val physicalOrder = orders.first { it.type == OrderType.PHYSICAL } as PhysicalOrder
    val digitalOrder = orders.first { it.type == OrderType.DIGITAL } as DigitalOrder
    val membershipOrder = orders.first { it.type == OrderType.MEMBERSHIP } as MembershipOrder

    val address = Address.Builder()
        .country("Brazil")
        .city("Sao Paulo")
        .state("SP")
        .postalCode("01000-000")
        .streetAddress("Av Paulista, 1000")
        .build()

    val myCreditCard = CreditCard(
        nameOnCard = "John Doe",
        number = "123.456.789-00",
        securityCode = 123,
        expiresAt =  YearMonth.of(2027, 7),
        billingAddress = address
    )

    val physicalOrderInvoice = physicalOrder
        .selectShippingAddress(address)
        .selectPaymentMethod(myCreditCard)
        .place()
        .pay()
        .invoice()

    val digitalOrderInvoice = digitalOrder
        .selectPaymentMethod(myCreditCard)
        .place()
        .pay()
        .invoice()

    val membershipOrderInvoice = membershipOrder
        .selectPaymentMethod(myCreditCard)
        .place()
        .pay()
        .invoice()
} 
```

## Application Design

### Product, ProductType

These are pretty self explanatory, right ? :)
ProductType has an enum parameter, mapping to what kind of Order that product would be in 

### Item 

Represents a given amount of Product in the `Shopping Cart` or in an `Order`

### Order
 
Represents an interface defining the implementations for  Physical, Digital and Membership Orders, 
each with its own set of rules for `place()`, `pay()`, `fulfill()` and `complete()` 

### PhysicalOrder 

May only contain products which the `ProductType` is 'Physical' or 'PHYSICAL_TAX_FREE'

  - `place()`: 
    - Setups the Packaging for Shipping                    
    - Includes a `Shipping and Handling` cost of extra $10 per package   
    - Ready the order to the `PENDING` status         
    - **Note**: Provided that there are items that fall under the `PHYSICAL_BOOK` category, they're grouped together into another shipment with the label `TAX_FREE`
    
  - `pay()`:
    - Provided that the Order has been placed, and not yet payed:
    - `//TODO:` Process the Payment 
    - Updates the OrderStatus to `UNSHIPPED`
        
  - `fulfill()`:
    - Provided that the order has been payed and not yet shipped:
    -  `//TODO:` Notifies the seller to fulfill/process the Order on its end
    - Updates the OrderStatus to `SHIPPED`
        
  - `complete()`:
    -  `// TODO:`: Track the packages/shipment they're all delivered
    - Updates the OrderStatus to `DELIVERED`
    
### Digital Order 

May only contain items of the `ItemType` 'Digital'    

  - `place()`: 
    - Includes a `Voucher` discount of $10 for the Order
    - Ready the order to the `PENDING` status     
    
  - `pay()`:
    - Provided that the Order has been placed, and not yet payed:
    - `//TODO:` Process the Payment 
    - Updates the OrderStatus to `UNSENT`
        
  - `fulfill()`:
    - Provided that the order has been payed and not yet sent:
    -  `//TODO:` Notifies the seller to fulfill/process the Order on its end
    - Updates the OrderStatus to `SENT`
        
  - `complete()`:
    -  `// TODO:`: Track when the the Buyer clicks on the emailed link to redeem the item
    - Updates the OrderStatus to `REDEEMED`    

### MembershipOrder

May only contain items of the `ItemType` 'Membership'

  - `place()`:
    - Ensures there's only one Subscription per Order
    - Ready the order to the `PENDING` status     
    - **Note**: In a scenario with multiple `Membership` Items in the Shopping Cart, 
    each will spawn a different Order
    
  - `pay()`:
    - Provided that the Order has been placed, and not yet payed:
    - `//TODO:` Process the Payment 
    - Updates the OrderStatus to `PENDING_ACTIVATION`
        
  - `fulfill()`:
    - Provided that the order has been payed and not yet activated:
    - `//TODO:` Activates the Subscription Service
    - Updates the OrderStatus to `ACTIVATED`
        
### ShoppingCart
 
To better simulate the user experience in an e-commerce platform, 
and also to wrap all the complexity of creating an Order, this Shopping Cart entity was created

  - `add(product: Product, n: Int)`:
    - Adds the N-amounts of the given `product` to the shopping Cart
    - **Note**: if the product is already in the Cart, adds up in the quantity
    
  - `updateQuantity(product: Product, n: Int)`:
    - Overrides whatever amount there is of the given `product` wih the specified `n` amount. 
      If `(n == 0)`, the product is deleted from the cart
          
  - `delete(product: Product)`: Deletes the product from the cart regardless of the quantity

  - `subtotal()`: Computes the sum of (unittest price of each product in the Cart * quantity)
    
  - `checkout(account: Account)`: 
    - All items that fall under `Physical` (regardless if their product category will be tax-free on Shipment or not) 
    are grouped together to create a `PhysicalOrder`        
    - All items that fall under `Digital` are grouped together to create a `DigitalOrder`      
    - Each item that falls under `Membership` will create a different Membership Order 
    (due to the complexity of activating each subscription individually, and probably through 3rd-party APIs) 
    
