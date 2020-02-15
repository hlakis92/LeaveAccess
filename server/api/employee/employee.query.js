let tbl_EmployeeMaster = "tbl_EmployeeMaster";
let tbl_LocationMaster = "tbl_LocationMaster";
let tbl_EmployeeWorkScheduleMapping = "tbl_EmployeeWorkScheduleMapping";


let query = {
  /* add employee details query start */
  addEmployeeDetailsQuery: {
    table: tbl_EmployeeMaster,
    insert: {
      field: ["firstName", "lastName", "email", "DOB", "gender", "address1", "address2", "cityName", "stateName", "pincode"],
      fValue: []
    }
  }, // add employee details query end
  getAllEmployeeByCustomFilterQuery: {
    join: {
      table: tbl_EmployeeMaster,
      alias: 'EM',
      joinwith: [{
        table: tbl_LocationMaster,
        alias: 'LM',
        joincondition: {
          table: 'EM',
          field: 'pk_empId',
          operator: 'eq',
          value: {
            table: 'LM',
            field: 'empId'
          }
        }
      }]
    },
    select: [{
      field: 'pk_empID',
      alias: 'empId'
    }, {
      field: 'employeeId',
      alias: 'employee_id'
    }, {
      field: 'firstName',
      alias: 'first_name'
    }, {
      field: 'lastName',
      alias: 'last_name'
    }, {
      field: 'DATE_FORMAT(EM.DOB, "%m-%d-%Y")',
      encloseField: false,
      alias: 'DOB'
    }, {
      field: 'DATE_FORMAT(LM.DOJ, "%m-%d-%Y")',
      encloseField: false,
      alias: 'DOJ'
    }, {
      field: 'EM.stateName',
      encloseField: false,
      alias: 'employee_state_name'
    }, {
      field: 'LM.state',
      encloseField: false,
      alias: 'location_state_name'
    }]
  },
  /* get employee info by emp_id query start */
  getEmployeeInfoByEmpIdQuery: {
    table: tbl_EmployeeMaster,
    select: [{
      field: 'pk_empID',
      alias: 'empId'
    }, {
      field: 'firstName',
      alias: 'first_name'
    }, {
      field: 'lastName',
      alias: 'last_name'
    }, {
      field: 'email',
      alias: 'email'
    }, {
      field: 'DATE_FORMAT(DOB, "%Y-%m-%d")',
      encloseField: false,
      alias: 'DOB'
    }, {
      field: 'gender',
      alias: 'gender'
    }, {
      field: 'address1',
      alias: 'address1'
    }, {
      field: 'address2',
      alias: 'address2'
    }, {
      field: 'cityName',
      alias: 'city'
    }, {
      field: 'stateName',
      alias: 'state'
    }, {
      field: 'pincode',
      alias: 'pincode'
    }],
    filter: {
      field: 'pk_empID',
      operator: 'eq',
      value: ''
    }
  }, // get employee info by emp_id query end
  // get employee location info by emp_id query start
  getEmployeeLocationInfoByEmpIdQuery: {
    join: {
      table: tbl_LocationMaster,
      alias: 'LM',
      joinwith: [{
        table: tbl_EmployeeWorkScheduleMapping,
        alias: 'EWSM',
        type: 'LEFT',
        joincondition: {
          table: 'LM',
          field: 'empId',
          operator: 'eq',
          value: {
            table: 'EWSM',
            field: 'empId'
          }
        }
      }]
    },
    select: [{
      field: 'LM.empId',
      encloseField: false,
      alias: 'empId'
    }, {
      field: 'employeeId',
      alias: 'employeeId'
    }, {
      field: '"active"',
      encloseField: false,
      alias: 'employeeStatus'
    }, {
      field: 'locationEmail',
      alias: 'locationEmail'
    }, {
      field: 'DATE_FORMAT(DOJ, "%Y-%m-%d")',
      encloseField: false,
      alias: 'DOJ'
    }, {
      field: '_12MonthHours',
      alias: '_12MonthHours'
    }, {
      field: 'address',
      alias: 'address'
    }, {
      field: 'city',
      alias: 'city'
    }, {
      field: 'state',
      alias: 'state'
    }, {
      field: 'pincode',
      alias: 'pincode'
    }, {
      field: 'supervisorContactName',
      alias: 'supervisorName'
    }, {
      field: 'supervisorContactNumber',
      alias: 'supervisorName'
    }, {
      field: 'supervisorContactEmail',
      alias: 'supervisorEmail'
    }, {
      field: 'HRContactName',
      alias: 'hrName'
    }, {
      field: 'HRContactNumber',
      alias: 'hrPhone'
    }, {
      field: 'HRContactEmail',
      alias: 'hrEmail'
    }, {
      field: 'PBContactName',
      alias: 'payrollName'
    }, {
      field: 'PBContactNumber',
      alias: 'payrollPhone'
    }, {
      field: 'PBContactEmail',
      alias: 'payrollEmail'
    }, {
      field: 'sunday',
      alias: 'inputsundayRSHours'
    }, {
      field: 'monday',
      alias: 'inputmondayRSHours'
    }, {
      field: 'tuesday',
      alias: 'inputtuesdayRSHours'
    }, {
      field: 'wednesday',
      alias: 'inputwednesdayRSHours'
    }, {
      field: 'thursday',
      alias: 'inputthursdayRSHours'
    }, {
      field: 'friday',
      alias: 'inputfridayRSHours'
    }, {
      field: 'saturday',
      alias: 'inputsaturdayRSHours'
    }],
    filter: {
      field: 'LM.empID',
      encloseField: false,
      operator: 'eq',
      value: ''
    }
  }, // get employee location info by emp_id query end
};

module.exports = query;