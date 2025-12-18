[🇬🇧 English Version](#fizzbuzz)

# Fizzbuzz

The following is a TDD Kata, an exercise in coding, refactoring and test-first, that you should apply while you have breakfast and enjoy good company.

Before you start

- Try not to read ahead.
- Do one task at a time. The trick is to learn to work incrementally.
- Make sure you only test for correct inputs. There is no need to test for invalid inputs for this kata.

General requirements

- Use whatever language and frameworks you want. Use something that you know well.
- Provide a README with instructions on how to compile and run the application.

IMPORTANT: Implement the requirements focusing on writing the best code you can produce.

# First step

List the numbers from 1 to 100, and:
- If the number is divisible by 3, write "Fizz" instead.
- If the number is divisible by 5, write "Buzz" instead
- If the number is divisible by both 3 and 5, write "FizzBuzz".
- If the number is not divisible neither by 3 nor 5, write the string representation of the number.

Sample output:
```
1 -> 1
2 -> 2
3 -> Fizz
4 -> 4
5 -> Buzz
6 -> Fizz
7 -> 7
8 -> 8
9 -> Fizz
10 -> Buzz
11 -> 11
12 -> Fizz
13 -> 13
14 -> 14
15 -> FizzBuzz
16 -> 16
```

# Second step

Apply all the rules from the previous step, adding:
- If a number is divisible by 3 **or** has a 3 in it, write "Fizz".
- If a number is divisible by 5 **or** has a 5 in it, write "Buzz".

Sample output:
```
1 -> 1
2 -> 2
3 -> Fizz
4 -> 4
5 -> Buzz
6 -> Fizz
7 -> 7
8 -> 8
9 -> Fizz
10 -> Buzz
11 -> 11
12 -> Fizz
13 -> Fizz
14 -> 14
15 -> FizzBuzz
16 -> 16
```
