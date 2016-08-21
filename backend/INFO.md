## Challenge Solution

### Control Through Polymorphism

The solution to the challenge involved using [polymorphism](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)) via [subtyping](https://en.wikipedia.org/wiki/Subtyping).

Hence the `Product` class became a superclass whose children are the several types of products available in the store (`git show 336a507`). Each subclass (`Physical`, `Book`, `Digital`, and `Membership`) inherits the `name` and `price` attributes and calls the superclass constructor. As of now, no further attributes are added in each subclass, but if further specialization is needed it should be easy to implement it.

Furthermore, each `Product` subclass implements a `process` method that contains the specialization required by each product type regarding its post-payment processing. The `Order` class also contains a `process` method that invokes this method to properly process each product type according to its rules, without needing to consider which type of product is under processing (`git show f804d35`). The rules are not fully implemented, but rather implied by a `puts` indicating was is to be done.

Therefore, if another product is to be added to the store, it suffices to add a class that inherits from `Product` and implements a `process` method. No changes have to be made to the `Order` processing.

### Proper Accounting of Product Pricing

The `total` method was changed in the `OrderItem` class (`git show 023c432`) to properly account for the addition of a `price` attribute to `Product`s.

### Customization of Customer Class

Even though this has no bearing on the solution of the challenge, the `Customer` class was customized to contain a `name`, `id`, and `dob` (i.e. date of birth) (`git show 759e18d`).

### Testing in `test.rb`

A small test is provided in the `test.rb` file (`git show 427fe37` and `git show 92fb424`). The test instantiates a fictional `Customer` and creates a container holding one product of each instance (`Physical`, `Book`, `Digital`, and `Membership`). An order containing each of these instances is open. After the payment is confirmed, the order is processed.

To run the test: `ruby backend/test.rb`
