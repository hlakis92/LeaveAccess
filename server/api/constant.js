let applicationConfiguration = {
  "APPLICATION_API_KEY": ["1", "b2236bde3ffbe7b27f425ae889ca1e08"], // local and 2.16
  "MAX_ACCESS_TOKEN_EXPIRY_HOURS": 24, // 1 days
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
    message: 'Invalid signup request'
  },
  'ERR_INVALID_ADD_EMPLOYEE_REQUEST': {
    code: 2006,
    message: 'Invalid add employee request'
  },
};

let userMessages = {
  ERR_IN_SIGNIN: {
    code: 2001,
    message: 'Incorrect email or password. please try again.'
  },
  MSG_SIGNIN_SUCCESSFULLY: {
    code: 2002,
    message: 'Signin successfully.'
  },
  NO_RECORD_FOUND: {
    code: 2003,
    message: 'No Record Found.'
  },
  USER_ADDDED: {
    code: 2004,
    message: 'User has been added successfully.'
  },
  USER_UPDATED: {
    code: 2005,
    message: 'User has been updated successfully.'
  },
  USER_DELETED: {
    code: 2006,
    message: 'User has been deleted successfully.'
  }, 
  USER_ERROR: {
    code: 2007,
    message: 'User module error.'
  },
  USER_ALREADY_EXIST: {
    code: 2008,
    message: 'User already exist!'
  },
};


let taskMessages = {
  NO_RECORD_FOUND: {
    code: 2001,
    message: 'No Record Found.'
  },
  TASK_ADDDED: {
    code: 2002,
    message: 'Task has been added successfully.'
  },
  TASK_UPDATED: {
    code: 2003,
    message: 'Task has been updated successfully.'
  },
  TASK_DELETED: {
    code: 2004,
    message: 'Task has been deleted successfully.'
  }, 
  TASK_ERROR: {
    code: 2005,
    message: 'Task module error.'
  },
  NOTES_ADDDED: {
    code: 2006,
    message: 'Notes has been added successfully.'
  },
  NOTES_UPDATED:{
     code: 2007,
    message: 'Notes has been updated successfully.'
  },
  NOTES_ERROR: {
    code: 2008,
    message: 'Notes module error.'
  },
};

let employeeMessages = {
  ERR_IN_ADD_EMPLOYEE: {
    code: 3001,
    message: 'Error while adding employee.'
  },
  MSG_ADD_EMPLOYEE_SUCCESSFULLY: {
    code: 3002,
    message: 'Employee has been added successfully.'
  },
  ERR_EMPLOYEE_NOT_FOUND:{
    code: 3003,
    message: 'Employees does not found.'
  }
};

let leaveMessages = {
  ERR_IN_EMPLOYEE_ID_ALREADY_EXIST: {
    code: 4001,
    message: 'Employee ID already exist.'
  },
  MSG_RETURN_TO_WORK_CONFIRMATION_ADDED_SUCCESSFULLY:{
    code: 4002,
    message: '{{type}} added successfully.'
  },
  MSG_PAPER_WORK_REVIEW_UPDATED_SUCCESSFULLY:{
    code: 4003,
    message: 'paper work review updated successfully.'
  }
};

module.exports = {
  appConfig: applicationConfiguration,
  requestMessages: requestMessages,
  userMessages: userMessages,
  employeeMessages: employeeMessages,
  leaveMessages: leaveMessages,
  taskMessages: taskMessages,
};
