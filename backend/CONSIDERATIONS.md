`Order Processing considerations`
==================

Considerations
-----------

### What
- Created more semantic structure path driven by domain rules
- Created a class called `OrderProcessing` that process order.
- Used Template Method approach, A.k.a the "Hollywood principle": "Don't call us, we call you." The ideia here is separate the most important post payment process in this scenario `pick`,`create_invoice`,`ship`

UML Diagram
-----------
![Image of OrderProcessing](https://raw.githubusercontent.com/pvgomes/challenge/master/backend/OrderProcessing.png)