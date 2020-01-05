let applicationConfiguration = {
  "APPLICATION_API_KEY": ["1", "b2236bde3ffbe7b27f425ae889ca1e08"], // local and 2.16
  "MAX_ACCESS_TOKEN_EXPIRY_HOURS": 720, // 30 days
  "PAGE_SIZE": 10, //
  "API_START_PATH": '/api/',
  "DB_DATE_FORMAT_DOB": '%Y-%m-%d',
  "DB_DATE_FORMAT": '%Y-%m-%d %H:%M:%S',
};


let requestMessages = {
  'ERR_API_BLOCK_ON_SPECIFY_TIME': {
    code: 1999,
    message: 'This functionality is not active in weekend 9:00 AM to 3:00 PM.'
  },
  'ERR_INVALID_API_REQUEST': {
    code: 2000,
    message: 'Invalid api request.'
  },
  'ERR_API_KEY_NOT_FOUND': {
    code: 2001,
    message: 'api-key not found'
  },
  'ERR_INVALID_API_KEY': {
    code: 2002,
    message: 'Invalid api-key'
  },
  'ERR_UDID_NOT_FOUND': {
    code: 2003,
    message: 'UDID not found'
  },
  'ERR_DEVICE_TYPE_NOT_FOUND': {
    code: 2004,
    message: 'device-type not found'
  },
  'ERR_INVALID_SIGNUP_REQUEST': {
    code: 2005,
    message: 'invalid signup request'
  },
  'ERR_INVALID_ADD_EMPLOYEE_REQUEST': {
    code: 2006,
    message: 'invalid add employee request'
  },
};

let userMessages = {
  ERR_IN_SIGNIN: {
    code: 2001,
    message: 'Incorrect email or password. please try again.'
  },
  MSG_SIGNIN_SUCCESSFULLY: {
    code: 2002,
    message: 'signin successfully.'
  },
};

let employeeMessages = {
  ERR_IN_ADD_EMPLOYEE: {
    code: 3001,
    message: 'error while adding employee.'
  },
  MSG_ADD_EMPLOYEE_SUCCESSFULLY: {
    code: 3002,
    message: 'employee added successfully.'
  },
  ERR_EMPLOYEE_NOT_FOUND:{
    code: 3003,
    message: 'employees not found.'
  }
};

module.exports = {
  appConfig: applicationConfiguration,
  requestMessages: requestMessages,
  userMessages: userMessages,
  employeeMessages: employeeMessages,
};
