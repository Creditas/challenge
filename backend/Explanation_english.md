## Challenge Backend Software Engineer

#### Language
To solve this challenge I have used the language Kotlin, is the language with which I 
have more knowledge of the three, also because it seems to me more understandable.

#### Solution
On the problem of sending rules, I have opted for the _factory_ pattern, 
because it adapts perfectly to the solution of the problem. 

I have defined the rules that will apply to each type of product, which in turn extend 
of the sealed class `OrderItemRules`, with the abstract method `process(Order, OrderItem)`.
- ProductPhysicalRule
- ProductMembershipRule
- ProductBookRule
- ProductDigitalRule

Each rule executes the relevant actions associated with that type of product by calling
the relevant services. If you want to add or remove an action only the `process` method 
of the rule in question should be modified.

The `OrderRulesFactory` class is responsible for returning the appropriate instance 
depending on the type of product within each order item. 

```kotlin
class OrderRulesFactory {
 fun getInstance(orderItem: OrderItem): OrderItemRules = when (orderItem.product.type) {
    ProductType.PHYSICAL -> OrderItemRules.ProductPhysicalRule
    ProductType.BOOK -> OrderItemRules.ProductBookRule
    ProductType.DIGITAL -> OrderItemRules.ProductDigitalRule
    ProductType.MEMBERSHIP -> OrderItemRules.ProductMembershipRule
  } 
} 
``` 
The actions take place in the services, with this we establish the _Single Responsibility Principle_ 
- DiscountService
- EmailService - PrinterService
- SubscriptionService 

#### About the code
I have refactored the code, creating a file for each class, separating the packages by
entities, models, enums and services. I have done it this way because I believe that in 
the future it would be the structure to follow.

On the pattern factory, I have decided to implement it with the expression `when`, 
to the being the condition an enum, this failure in compilation time in case of 
modifying the enum adding a new item, so we'd avoid mistakes.

To the `process` methods of the `OrderItemRules`, I thought it convenient to pass the 
parameters `Order` and `OrderItem`. With the first one we have all the order information,
with the second the specific product on which we are going to perform the action.
I think that `Order` could be replaced by `Payment`, if necessary, but even
so, in this first version, the attributes we would have access to would be the same
both with one and the other.

In addition, all rules have the `internal` modifier, so you can't create
an instance of the object if not with the `OrderRulesFactory` class. 

The services are singleton, so I avoid having to create the instance every time, and 
I also persist the printer queue and emails. I have done it simulating the injection 
of Spring's dependencies.

In addition, the service instance is lazy, so we avoid creating an instance of the 
service until it is needed for the first time.


Translated with www.DeepL.com/Translator
