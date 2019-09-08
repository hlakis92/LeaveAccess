let tbl_EmployeeMaster = "tbl_EmployeeMaster";


let query = {
  /* add employee details query start */
  addEmployeeDetailsQuery: {
    table: tbl_EmployeeMaster,
    insert: {
      field: ["firstName", "lastName", "email", "DOB", "gender", "address1", "address2", "cityName", "stateName", "pincode"],
      fValue: []
    }
  }, // add employee details query end
};

module.exports = query;