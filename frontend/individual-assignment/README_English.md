<img src="https://www.creditas.com.br/static/images/logo-creditas-color-8367919c2a.svg" width="400">

# Frontend Challenge - Creditas

This is a challenge designed to measure the candidate's expertise.
We would like to clarify that we don't expect everyone to be able to finish the whole challenge, since it has been designed to cover the several degrees of expertise, from junior to senior.
Nevertheless, we expect anyone interested in becoming a tripulante in Creditas to give it a try.

In this challenge, we focus both on code design and design patterns in JavaScript. The goal is to assess your experience in writing **code that is easy to maintain, loosely coupled and highly cohesive**.

At Creditas we always work giving constructive feedback, therefore we will always dedicate the outmost attention to every solution submitted; contacting you back with the positive aspects of your submission and what could be improved. Just for that it is worth trying! :)

## The challenge

You have to improve the loan simulation calculator implemented in this project.

Both the interface as well as the styles are provided. The challenges include refactoring the code and implemetning new functionalities (listed below).

Feel free to componentize whatever you think should be componentized. Our only request is that you use only pure JavaScript, our beloved Vanilla. Do you accept the challenge?

The calculator's current state:
<img style="display: block; margin: 0 auto;" src="./layout.png">


### Expected functionalities

The application must allow the user to choose the collateral type they want to use in their equity loan simulation:
***"Auto"*** or ***"Home"*** (the default option is ***"Auto"*** ).

It should also follow the calculation rules bellow:

**Common Rules**
- Financial Transaction Tax (FTT): 6.38%;
- Interest Rate: 2.34%;
- Maximum loan-to-value (amount the user can borrow): 80% of the collateral's value;

*Total Loan Amount Formula*

```javascript
const totalLoanAmount = ((FTT / 100) + (interestRate / 100) + (termInMonths / 1000) + 1) * loanAmount
```

*Monthly payment formula*

```javascript
const monthlyPayment = totalLoanAmount / termInMonths
```

## Challenges to achieve

### CSS
* **Refactor to make maintainance easier** 

Currently, the project's CSS file has too many styles, making readability difficult. We expect you to organize styles, isolating them in order to make them more readable and easier to maintain.

### HTML / JS
* **Add new collateral type _"Home"_** (with its calculation rules) 
* **Refactor the old code (and arrange the new one) to make maintainance easier** 

Currently, Creditas offers two products: home equity loan and auto equity loan. This project implements the *"auto equity"* option only, **you must implement the *"home equity"* option**.
By changing the collateral type in the `select` element, the user must see the amount and term options corresponding to the product chosen. That is, when selecting either _"Home"_ or _"Auto"_, you must show the correspondent values for each option on the form fields and on the slider.
Please find the corresponding values below:

**Auto**
- Minimum loan amount: R$ 3.000,00;
- Maximum loan amount: R$ 100.000,00;
- Terms: 24 / 36 / 48 months
- Minimum guarantee amount: R$ 5.000,00;
- Maximum guarantee amount: R$ 3.000.000,00;

**Home**
- Minimum loan amount: R$ 30.000,00;
- Maximum loan amount: R$ 4.500.000,00;
- Terms: 120 / 180 / 240 months
- Minimum guarantee amount: R$ 50.000,00;
- Maximum guarantee amount: R$ 100.000.000,00;

Finally, you must update the monthly payment value whenever changes in the form's inputs are done.

## Development

### Prerequisites

You will need to install on your machine:
- [NodeJs](https://nodejs.org/en/) in order to run the application.
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) in order to clone the repository containing this challenge and submit the pull request with your solution.

### Configuration to run the environment

By executing the following lines of code in your terminal you will be able to:
- Clone the repository containing this challenge.
- Install the necessary dependencies to run the application.
- Run the application.

```shell
git clone https://github.com/Creditas/challenge.git
cd frontend/
npm install
npm start
```

If everything is correct, you should be able to access the following URL: [http://localhost:4000/](http://localhost:4000/).

### Dependencies

This project uses some libraries to assist us with tests and running the application. Those are: 
- [https://webpack.js.org/](Webpack)
- [https://babeljs.io/](Babel)
- [https://jestjs.io/](Jest)
- [https://eslint.org/](Eslint)

## Tests

To run the tests you must execute the following command:

```shell
npm test
```

## Feedback (optional)

As we said earlier, here at Creditas constructive feedbacks are part of our culture, so it would be very rewarding if you could contribute with our hiring process by giving us your [https://docs.google.com/forms/d/e/1FAIpQLSdwjudz38JMtMYf3rFBrMHX3XMy2J5oBLPnjBGD1QKvOM2SGg/viewform](opinion) on the challenge.
We would like you to send it even if you didn't finish the challenge.
