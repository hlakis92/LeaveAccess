let tbl_UserMaster = "tbl_UserMaster";


let query = {
  /* check user is exist query start */
  checkUserIsExistQuery: {
    table: tbl_UserMaster,
    select: [{
      field: 'pk_userId',
      alias: 'user_id'
    }, {
      field: 'IFNULL(name,"")',
      encloseField: false,
      alias: 'name'
    }, {
      field: 'countryCode',
      alias: 'country_code'
    }, {
      field: 'mobile',
      alias: 'mobile'
    }, {
      field: 'isActive',
      alias: 'is_active'
    }, {
      field: 'isVerified',
      alias: 'is_verified'
    }, {
      field: 'IFNULL(playerSkill,"")',
      encloseField: false,
      alias: 'player_skill'
    }, {
      field: 'IFNULL(pin,"")',
      encloseField: false,
      alias: 'pin'
    }]
  },
  /* create user query start */
  addUserQuery: {
    table: tbl_UserMaster,
    insert: {
      field: ["username", "email","password"],
      fValue: []
    }
  }, // create user query end
  userLoginQuery:{
    table:tbl_UserMaster,
    select: [{
      field: 'pk_userID',
      alias: 'user_id'
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
  }
};

module.exports = query;