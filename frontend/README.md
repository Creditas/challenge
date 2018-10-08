## tête-à-tête
![](public/android-chrome-192x192.png?raw=true)

A simple Chat App made with React and Redux

Demo available at: [https://romulobordezani.github.io/challenge/](https://romulobordezani.github.io/challenge/)

Please, try this PWA on an Android Phone using Chrome and add it to your Home screen.

# Achieved Features
- **Progressive Web App**
- Offline mode
- Animated 
- Responsive
- Using Function Generators to make async requests (Sagas)
- Fake interfaces to simulate TypeScript way to code
- SASS, BEM and Flex Box to style it
- Normalized with Normalize.css
- Uses material-ui react library
- Airbnb and Prettier as code stylers (with rules to prevent a war between them)
- Deploy using gh-pages

# What I would still like to do, but I'm out of time
- Implement Type script
- Add snapshots tests (already supports Jest)
- Enhance Jest with Enzyme to get a higher coverage and user's event simulations
- Add Docker and CI CD with gitlab, delivering in an AWS instance
- Server Side Render using [Next.js](https://nextjs.org/)
- A **Back-end For Front-end** middleware using Node.js and Express, serving in a GraphQL/Apollo/Modern Relay way
- Server responses mocks using [fetch-mock](https://www.npmjs.com/package/fetch-mock) to get a higher coverage

### How to start
````
yarn install

````

### How to run

````
yarn start
````

Access [http://localhost:3000/](http://localhost:3000/) 

### How to test

````
yarn test
````

### How to lint

````
yarn run lint
````

### How to prettify

````
yarn run prettify
````

This project used *Create React App* as Boilerplate, original documentation about it at: [README_cra](README_cra.md)

References regarding the challenge are still available at: [README_challenge](README_challenge.md)
