module.exports = {
  // error codes and message
  error: {
    // UUID Error Codes
    1001: { code: "1001", message: "No access" }
    , 1002: { code: "1002", message: "Invalid UUID" }
    , 1003: { code: "1003", message: "UUID is required" }
    , 1004: { code: "1004", message: "Invalid length to create UUID" }
    , 1005: { code: "1005", message: "Invalid character found to create UUID" },

    // CommentBox Error Codes
    1101: { code: "1101", message: "Invalid comment-box state" }
    , 1102: { code: "1102", message: "Comment is not added" },

    // Database-Connector Error Codes
    1201: { code: "1201", message: 'Cannot connect to database' }
    , 1202: { code: "1202", message: 'Error in execute query'}
    , 1203: { code: "1203", message: 'Unknown error occurred'},

  },

  // success codes and messages
  success: {
    // General success code
    10001: { code: "10001", message: "Success" },

    // CommentBox Success Codes
    11001: { code: "11001", message: "Comment is added successfully" }
  },
  status: {
    'J2Q_INSERT_UPDATE_DELETE_SELECT_MERGED':{
      code: "12001",
      message: ""
    },
    'AXIOM_UNAUTHORIZED_ACCESS':{
      code: "401",
      message: "Unauthorized Access"
    },
    'AXIOM_FILE_NOT_FOUND':{
      code: "404",
      message: "File not found"
    }
  }

}
