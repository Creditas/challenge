# Hello, My Dear (and Maybe Future Leader and Co-worker)

Even though the entire process so far has been in Portuguese, I am providing this document in English to encourage a broader mindset. I hope you enjoy the code! :3

## Problem

You are reviewing the design decisions of software that processes online orders. For these orders, payments are handled based on specific situations:

- If the payment is for a physical item, a shipping label must be generated and placed in the shipping box.
- If the payment is for a service subscription, the subscription must be activated, and the user notified via email.
- If the payment is for an ordinary book, a shipping label must be generated with a notification that it is a tax-exempt item as provided in the Constitution Art. 150, VI, d.
- If the payment is for any digital media (music, video), in addition to sending a purchase confirmation email to the buyer, a $10 discount voucher must be granted to the buyer associated with the payment.

## Solution

A new method `processProduct` was added to the `Order` class, which calls auxiliary functions that are executed based on the provided `Enum` type, similar to a map. You can check these functions in `kotlin/extension/ProductTypeProcess.kt`.

After the payment is set, we must proceed with the shipping or provisioning process. Although it was not implemented, it is noted that a database transactional approach would be ideal to cancel the payment in case of an internal error during the shipping process.

Regarding the process functions, an expanding approach was attempted. They route to classes that process the order information and utilize their specific data:

- **physicalProcess**: Address validation was set to demonstrate exception test cases. The shipping method is the same and can extend the possible taxes by using a list of an enum, placing them in order to make them exempt from the given tax.
- **bookProcess**: This method uses the same function as `physicalProcess`, but passes `Taxes.SHIP_ART_150` to make it exempt.
- **digitalProcess**: Calls `DigitalPurchaseImpl`, which has the `sendMailWithVoucher` function, receiving a `SendEmailImpl`. `SendEmailImpl` is a black box that creates the email body, with or without a voucher. `DigitalProcess` has a companion object with a default voucher, which can be changed according to the situation, making it easier to provide random vouchers or larger vouchers based on the number of purchases.
- **membershipProcess**: Also calls `SendEmailImpl`, and uses `MembershipImpl`, which validates the customer, checks if they are already a member, and proceeds accordingly before sending the email. If the business decides that the member should now receive a voucher, it can be easily changed.

SOLID principles were applied, ensuring that functions have single responsibilities, adhere to Open/Closed principles, etc.

The project structure follows Kotlin patterns.

The test class has a 'Fixture' folder, which I prefer to create for objects, as they can become more complex, only copying certain values and changing them.

**Note:**
The `Order` class would be better as a Data Class, with an implementation that receives an `OrderDto` and deals with its data, avoiding a larger fixture class for tests as we could use the `.copy()` method.

Whether we proceed with this process or not, let’s connect and maybe share knowledge! ^~^  
[LinkedIn](https://www.linkedin.com/in/gabrielteixeirasoares/)

See ya!
