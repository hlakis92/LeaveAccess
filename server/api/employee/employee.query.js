let tbl_EmployeeMaster = "tbl_EmployeeMaster";
let tbl_LocationMaster = "tbl_LocationMaster";


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
  }
};

module.exports = query;