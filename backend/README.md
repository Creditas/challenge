# Creditas Backend Test

Review code to use best practices and, if possible, finish it and test it.

## Language and test library used
- Ruby - 2.4.1
- RSpec - 3.6.0

### Executing the code
- Just run `rspec` in the project's root

#### Decisions:
- I used RSpec to test my code. I'm more familiar with both RSpec and Cucumber
    - RSpec is a better choice to this context
- I wrote unit tests only for Order class, but I would like to write tests to everything!
	- I tried to stay in the  "ideal time" (1 hour and 30 minutes)
- I separated every classes from the `bootstrap.rb` into different files
- I created services for both Email and Printer, to simulate their behavior
- I started with a switch/case to have a different behavior for each Product's type and later I refactor it to an inheritance with OrderItemType, BookType, DigitalType, MembershipType, and PhysicalType