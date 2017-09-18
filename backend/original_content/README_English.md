## Challenge for Backend Software Engineer

You are reviewing the design decisions of software that processes Online ordering. For these requests, payments are made that receive treatments depending on the specific situations of each one as follows:

  - If the payment is for a physical item, you must generate one shipping labelfor it to be placed in the shipping box;
  - If payment is a service subscription, you must activate the subscription, and notify the user via email about this;
  - If the payment is an ordinary book, you must generate it shipping label with a notification that it is a tax-exempt item as provided in the Constitution Art. 150, VI, d.
  - If payment of any digital media (music, video), in addition to sending the description of the purchase by email to the buyer, grant a discount voucher of $ 10 to the buyer associated with the payment.

__What do I need to do?__

You have been assigned to prototype how the new version of this payment stream / submission rules can be made, because the current version is fragile, threaded in if / else, switch / case , requiring large modifications with each new send / Or removed.

Create the classes, methods and their respective calls so that by receiving an input ( Payment or Order - it is at your discretion ), you can handle the above scenarios .

**It is not necessary to create the implementations for sending e-mails, to print the shipping label , etc. For these cases (email, shipping label) only create method calls, to indicate that it would be the place where the sending would take place.

Since the proposal does not require a working final code , there is no need to implement the unit tests. However, we will take this as bonus points . The use of libs is allowed to facilitate the implementation of the tests.

__What is under evaluation?__

One’s ability to analyze, design and code a solution by guiding oneself with **Object Oriented Design** and **Object Guiding Principles** (<-this probably needs improved translation).

Feel free to modify / refactor the file bootstrap.rb if you feel it is necessary.

Please describe your modifications and reasoning in a separate text file or markdown.

__What we don't want__
 - Frameworks :] (you don't need to use any)
 - Metaprogramming

__What language?__
Ruby.

__Time__
It should take you about 1h30 to complete this challenge, however you can take as long as you like.

__Presentation__
  - Code
  - Explanation of the solution (in separate file in Markdown / Plain Text)

__Evaluation__

To send us your code, you can:

 - Make a fork of this repository, and send us a pull-request.
 - Give access to your private repository in gitlab to hlegius, matheusca and regishideki.
