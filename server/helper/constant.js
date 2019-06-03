"use strict";
/**
 * Status codes and messages
 */
var status = {
  // database errors
  'DB_CONN_ERR': {
    code: 10000,
    message: 'Cannot connect to database'
  },
  'DB_QUERY_ERR': {
    code: 10001,
    message: 'We\'re not sure what happened. Refresh the page and try again.'
  },
  'ER_DUP_ENTRY': {
    code: 10002,
    message: 'Error duplicate entry'
  },
  'MSG_TRANSACTION_SUCCESS': {
    code: 10003,
    message: 'Transaction completed successfully!'
  }
};

/**
 * Constants used in modules
 * @type {Object}
 */
var constant = {
  status: status
};

module.exports = constant;
