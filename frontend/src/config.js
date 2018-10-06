const dev = {
  socketServer: {
    url: 'localhost:3000'
  }
};

const prod = {
  socketServer: {
    url: 'localhost:3000'
  }
};

const config = process.env.REACT_APP_ENVIRONMENT === 'production' ? prod : dev;

export default {
  // > Shared configs here
  ...config
};
