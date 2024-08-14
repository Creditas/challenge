# Hello my dear (and maybe future Leader and Co-worker)

Besides the whole process so far being in portuguese, I shall provide this doc in English, due to expanding mindset
Hope you enjoy the code :3

## Problem

You are reviewing the design decisions of software that processes Online ordering. For these requests, payments are made that receive treatments depending on the specific situations of each one as follows:

  - If the payment is for a physical item, you must generate one shipping labelfor it to be placed in the shipping box;
  - If payment is a service subscription, you must activate the subscription, and notify the user via email about this;
  - If the payment is an ordinary book, you must generate it shipping label with a notification that it is a tax-exempt item as provided in the Constitution Art. 150, VI, d.
  - If payment of any digital media (music, video), in addition to sending the description of the purchase by email to the buyer, grant a discount voucher of $ 10 to the buyer associated with the payment.


## Solution

It was provided a new method processProduct in Order, which will call auxiliary functions that will run according to provided Enum type, like a map.
you can check them in kotlin/extension/ProductTypeProcess.kt

After payment is set, we must proceed with shipping or providing process, it was not implemented, but commented that we may be carefull with shipping process, a database Transactional approach would be ideal to cancel payment if internal error occurs.

Anyway, about the Process functions, it was attempted a expanding approach, they route to classes that will process Order information, and use their specific data

- physicalProcess: Was set address validation in order to show exception test case, the ship method is the same, and can extend the possible taxes, being a list of an enum, and placing them in order to make them exempt of the given tax

- bookProcess: As said in PhysicalProcess, this method use the same function, but passing the Taxes.SHIP_ART_150, in order to make it exempt

- digitalProcess: calls DigitalPurchaseImpl, wich has the sendMailWithVoucher function, receiving a SendEmailImpl, this SendEmailImpl is a black box that will make the email body, and receiving or not a voucher, so DigitalProcess has a companion object with default vaucher, that can be changed according to situation, making easier to provide random vauchers or as more purchases the client do, the greater the voucher

- membershipProcess: also calls SendEmailImpl, it will use the MembershipImpl which will validate customer, and checking if he is already a member or not, proceeding differently, and then sending the email, also, if business says that the member will now receive a voucher, it can be easily changed

It was attempted SOLID principles, so that functions will have single responsabilities, Open/Closed, etc

The project structure is  according to Kotlin patters

Test class has 'Fixture' folder, which I rather create for objects, as they can get more complexes, only copying certain values, and changing then

NOTE : 
The Order class would be better as a Data Class, and make a impl that receive a OrderDto and deal with its data, and avoiding a bigger fixture class for test too, as we could use the .copy()

Moving the proccess or not, lets connect, and maybe share knowledge ^~^
[LinkedIn](https://www.linkedin.com/in/gabrielteixeirasoares/)

See ya!
