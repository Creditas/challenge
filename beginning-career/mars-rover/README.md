[🇬🇧 English Version](#mars-rover)

# Mars Rover

The following is a TDD Kata, an exercise in coding, refactoring and test-first, that you should apply while you have breakfast and enjoy good company.

The objective is creating a simple simulation of a Mars rover robot. A Mars rover is an automated motor vehicle that propels itself across the surface of the planet Mars upon arrival.
- The rover will be landing on the Martian surface in a given position, with a given orientation (North, South, East, West).
- It will be able to move forward, rotate left and rotate right.

You can use the included tests as a basis, and/or modify anything you deem required. Also, feel free to add any comments to explain anything you find important.

Before you start

- Try not to read ahead.
- Do one task at a time. The trick is to learn to work incrementally.
- Make sure you only test for correct inputs. There is no need to test for invalid inputs for this kata.

General requirements

- Use whatever language and frameworks you want. Use something that you know well.
- Provide a README with instructions on how to compile and run the application.

IMPORTANT: Implement the requirements focusing on writing the best code you can produce.


## Step 1: Landing

The rover knows its landing position.
The rover knows its current position.

Sample execution:
```
Given landing position and orientation is (1,2,N)
Then its position and orientation is (1,2,N)
```

# Step 2: Moving

The rover supports all features from previous step, plus:

The rover may receive a list of letters as command.
- When the rover recives the command "M" it moves forward.
- When the rover recives the command "R" it turns 90 degrees right.
- When the rover recives the command "L" it turns 90 degrees left.

Sample execution:
```
Given landing position and orientation is (1,2,N)
When receiving command "MMM"
Then its position and orientation is (1,5,N)
```

# Step 3: World awareness

The rover supports all features from previous step, plus:

The rover is aware of the world dimensions.
- If the rover goes through the world's edge, it appears in the opposite position (since planets are "spherical")

Sample execution:
```
Given world dimensions are (5,5)
And landing position and orientation is (1,1,N)
When receiving command "MMMMM"
Then its position and orientation is (1,1,N)
```
