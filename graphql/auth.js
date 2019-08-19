const authenticate = (token) => {
  return token == process.env.CUSTOM_TOKEN;
};

const authWrapper = (func) => {
  return function() {
    const authorization = arguments[2].request.headers.authorization;
    const errorName = arguments[2].errorName;
    
    if (authenticate(authorization)) {
      return func.apply(this, arguments);
    } else {
      throw new Error(errorName.UNAUTHORIZED);
    }
  }
};

exports.authWrapper = authWrapper;
