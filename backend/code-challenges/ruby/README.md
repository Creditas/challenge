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

### Comments:

- The challenge scope will be developed alongside crew members during the pairing interview
- We need you to bring for the interview an initial setup of the solution proposal with the preferred language
- This assessment is confidential and must NOT be shared with other people than you and and our crew members

# Configuration & Installation

## Prerequisites
You must have ruby version `3.0.2` installed.

We recommend the usage of a version manager. The most popular ones are:
- [rvm](https://rvm.io/)
- [rbenv](https://github.com/rbenv/rbenv)
- [asdf](https://github.com/asdf-vm/asdf)


## Install dependencies

We use bundler as the ruby package manager

```sh
gem install bundler
```

To install the packages (only rspec for tests)

```sh
bundle install
```

## Running Project and test

We are using rspec for the unit testing

```sh
rspec
```

You should expect a failing test
