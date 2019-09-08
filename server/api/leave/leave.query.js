let tbl_employeemaster = "tbl_employeemaster";
let tbl_locationmaster = "tbl_locationmaster";
let tbl_leaveinfo = "tbl_leaveinfo";
let tbl_emolyeeleave = "tbl_emolyeeleave";


let query = {
  /* create user query start */
  addEmployeeDetailsQuery: {
    table: tbl_employeemaster,
    insert: {
      field: ["firstName", "lastName", "email", "DOB", "gender", "address1", "address2", "cityName", "stateName", "pincode"],
      fValue: []
    }
  }, // create user query end
  /* create user query start */
  addLocationDetailsQuery: {
    table: tbl_locationmaster,
    insert: {
      field: ['empId', 'DOJ', 'employeeId', 'locationEmail', '_12MonthHours', 'address', 'city', 'state', 'pincode'],
      fValue: []
    }
  }, // create user query end
  /* create user query start */
  addLeaveInfoQuery: {
    table: tbl_leaveinfo,
    insert: {
      field: ['empId','leaveReason', 'familyFirst', 'familyLast', 'familyMemberDOB', 'familyRelation', 'inLocoParent', 'providerName', 'providerType', 'providePhone','provideFax','provideAddress','startDate','endDate','leaveType'],
      fValue: []
    }
  }, // create user query end
  /* create user query start */
  addEmployeeLeaveQuery: {
    table: tbl_emolyeeleave,
    insert: {
      field: ['empId', 'leaveId', 'leave_name', 'state', 'eligibility', 'qualifying_reason', 'leave_type', 'maximum_duration', 'from_date', 'to_date'],
      fValue: []
    }
  }, // create user query end
};

module.exports = query;