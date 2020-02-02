let tbl_UserMaster = "tbl_UserMaster";
let tbl_AccessToken = "tbl_AccessToken";


let query = {
  /* create user query start */
  addUserQuery: {
    table: tbl_UserMaster,
    insert: {
      field: ["name", "email", "usertype", "password"],
      fValue: []
    }
  }, // create user query end
  userLoginQuery: {
    table: tbl_UserMaster,
    select: [{
      field: 'pk_userID',
      alias: 'userId'
    }, {
      field: 'name',
      alias: 'name'
    }, {
      field: 'userType',
      alias: 'userType'
    }],
    filter: {
      and: [{
        field: 'email',
        operator: 'EQ',
        value: ''
      }, {
        field: 'password',
        operator: 'EQ',
        value: ''
      }]
    }
  }, //end
  /* add access token query start */
  addAccessTokenQuery: {
    table: tbl_AccessToken,
    insert: {
      field: ["fk_userID", "deviceID", "token", "expiryDateTime"],
      fValue: []
    }
  }, // add access token query end
  /* edit access token query start */
  editAccessTokenQuery: {
    table: tbl_AccessToken,
    update: [{
      field: 'isExpired',
      fValue: 1
    }],
    filter: {
      and: [{
        field: 'deviceID',
        operator: 'EQ',
        value: ''
      }, {
        field: 'deviceID',
        operator: 'EQ',
        value: ''
      }]
    }
  }, // edit access token query end
  // Userlist
  getUserListQuery: {
    table: tbl_UserMaster,
    select: [{
      field: 'pk_userID',
      alias: 'user_id'
    }, {
      field: 'name',
      alias: 'name'
    }, {
      field: 'usertype',
      alias: 'usertype'
    }, {
      field: 'email',
      alias: 'email'
    }],
    filter: {
      field: 'isDeleted',
      operator: 'EQ',
      value: 0
    }
  }, //end
  // Managerlist
  getManagerListQuery: {
    table: tbl_UserMaster,
    select: [{
      field: 'pk_userID',
      alias: 'userId'
    },
      {
        field: 'name',
        alias: 'name'
      }],
    filter: {
      field: 'isDeleted',
      operator: 'EQ',
      value: 0
    },
    sortby: [{
      field: 'name'
    }],
  }, //end
  // Get user
  getUserQuery: {
    table: tbl_UserMaster,
    select: [{
      field: 'pk_userID',
      alias: 'user_id'
    }, {
      field: 'name',
      alias: 'name'
    }, {
      field: 'usertype',
      alias: 'usertype'
    }, {
      field: 'email',
      alias: 'email'
    }, {
      field: 'status',
      alias: 'status'
    }, {
      field: 'password',
      alias: 'password'
    }],
    filter: {
      field: 'pk_userID',
      operator: 'EQ',
      value: ''
    }
  }, // end
  // Get user
  checkUserExistQuery: {
    table: tbl_UserMaster,
    select: [{
      field: 'pk_userID',
      alias: 'user_id'
    }, {
      field: 'email',
      alias: 'email'
    }],
    filter: {},
  }, // end
  updateUserQuery: {
    table: tbl_UserMaster,
    update: [],
    filter: {
      field: 'pk_userID',
      operator: 'EQ',
      value: ''
    },
  },
  // Delete
  deleteUserQuery: {
    table: tbl_UserMaster,
    update: [{
      field: 'isDeleted',
      fValue: 1
    }],
    filter: {
      field: 'pk_userID',
      operator: 'EQ',
      value: ''
    }
  }
};

module.exports = query;