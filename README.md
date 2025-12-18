# Code Challenge

The assessment proposal which we'll develop together is provide a person with the loan types suitable for her, given some variables:

We must provide the following loan types:

- Personal Loan. Interest Rate: 4%
- Collateralized Loan. Interest Rate: 3%
- Payroll Loan. Interest Rate: 2%

Listed below are the business rules for conceding a loan based on the person's profile:

|                          | Personal Loan | Collateralized Loan | Payroll |
| ------------------------ | ------------- | :-----------------: | ------- |
| Income <= 3000           | Yes           |       Yes\*\*\*     | No      |
| Income > 3000 & < 5000   | Yes           |        Yes\*\*      | No      |
| Income => 5000           | Yes           |         Yes\*       | Yes     |

- \* Clients under 30 y.o.
- \*\* Clients residing in SP (São Paulo state code in Brazil)
- \*\*\* Clients under 30 y.o. residing in SP

### App usage:

The application must receive the following data as input:

##### input

```json
{
  "customer": {
    "name": "Erikaya",
    "cpf": "123.456.789-10",
    "age": 29,
    "location": "SP",
    "income": 3000
  }
}
```

_For the sake of simplicity, consider we'll always receive the correct data (types and formats)_

And must respond the following data:

##### output

```json
{
  "customer": "Erikaya",
  "loans": [
    {
      "type": "personal",
      "taxes": 1
    }
  ]
}
```

## Before the interview
- Since this will be a pair programming interview, make sure that you'll be able to share your screen on Google Meet
- Set up the project on your language of choice. The instructions are inside the respective folders. This will save precious minutes during the interview.
- Take your time and become familiar with the challenge, files and project structure

## During the interview
- This challenge will be tackled alongside our crew, in a pair programming dynamic
- This pair programming dynamic tries to simulate the crew's day-to-day practices, so feel free to raise any question, ask for suggestions, etc. There is no right or wrong, we're only interested in understanding how you approach problems!

## After the interview
- The code written during this interview is confidential, and MUST NOT be shared with anyone other than our crew. 


# Setup

- Install dependencies

# Run the tests

You may execute the following command via CLI:

```bash
$ ./gradlew test
```

If tests are failing, then you succeeded. Fear nothing!

Now it's all about coding.

Good luck!
