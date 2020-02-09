let tbl_EmployeeMaster = "tbl_EmployeeMaster";
let tbl_LocationMaster = "tbl_LocationMaster";
let tbl_LeaveInfo = "tbl_LeaveInfo";
let tbl_EmployeeLeave = "tbl_EmployeeLeave";
let tbl_EmployeeWorkScheduleMapping = "tbl_EmployeeWorkScheduleMapping";
let tbl_PaperWorkReview = "tbl_PaperWorkReview";


let query = {
  /* create user query start */
  addEmployeeDetailsQuery: {
    table: tbl_EmployeeMaster,
    insert: {
      field: ["firstName", "lastName", "email", "DOB", "gender", "address1", "address2", "cityName", "stateName", "pincode"],
      fValue: []
    }
  }, // create user query end
  /* create user query start */
  addLocationDetailsQuery: {
    table: tbl_LocationMaster,
    insert: {
      field: ['empId', 'DOJ', 'employeeId', 'locationEmail', '_12MonthHours', 'address', 'city', 'state', 'pincode'],
      fValue: []
    }
  }, // create user query end
  /* add employee work schedule query start  */
  addEmployeeWorkScheduleQuery: {
    table: tbl_EmployeeWorkScheduleMapping,
    insert: {
      field: ['empId', 'fk_locationId', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      fValue: []
    }
  }, // add employee work schedule query end
  /* create user query start */
  addLeaveInfoQuery: {
    table: tbl_LeaveInfo,
    insert: {
      field: ['empId', 'leaveReason', 'familyFirst', 'familyLast', 'familyMemberDOB', 'familyRelation', 'inLocoParent', 'providerName', 'providerType', 'providePhone', 'provideFax', 'provideAddress', 'startDate', 'endDate', 'leaveType'],
      fValue: []
    }
  }, // create user query end
  /* create user query start */
  addEmployeeLeaveQuery: {
    table: tbl_EmployeeLeave,
    insert: {
      field: ['empId', 'leaveInfoId', 'leaveId', 'leave_name', 'state', 'eligibility', 'qualifying_reason', 'leave_type', 'maximum_duration', 'from_date', 'to_date'],
      fValue: []
    }
  }, // create user query end
  getAllEmployeeLeaveQuery: {
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
      }, {
        table: tbl_EmployeeLeave,
        alias: 'EL',
        joincondition: {
          table: 'EM',
          field: 'pk_empId',
          operator: 'eq',
          value: {
            table: 'EL',
            field: 'empId'
          }
        }
      }]
    },
    select: [{
      field: 'pk_empID',
      alias: 'emp_id'
    }, {
      field: 'firstName',
      alias: 'first_name'
    }, {
      field: 'lastName',
      alias: 'last_name'
    }, {
      field: 'LM.state',
      encloseField: false,
      alias: 'state'
    }, {
      field: 'leaveId',
      alias: 'leave_id'
    }, {
      field: 'leave_name',
      alias: 'leave_name'
    }, {
      field: 'DATE_FORMAT(from_date, "%m-%d-%Y")',
      encloseField: false,
      alias: 'from_date'
    }, {
      field: 'DATE_FORMAT(to_date, "%m-%d-%Y")',
      encloseField: false,
      alias: 'to_date'
    }]
  },
  getEmployeeLeaveSummaryByEmpIdQuery: {
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
      }, {
        table: tbl_LeaveInfo,
        alias: 'LI',
        joincondition: {
          table: 'LI',
          field: 'empId',
          operator: 'eq',
          value: {
            table: 'EM',
            field: 'pk_empId'
          }
        }
      }]
    },
    select: [{
      field: 'pk_empID',
      alias: 'emp_id'
    }, {
      field: 'pk_leaveInfoId',
      alias: 'leave_info_id'
    }, {
      field: 'leaveType',
      alias: 'leave_type'
    }, {
      field: 'DATE_FORMAT(LI.startDate, "%m/%d/%Y")',
      encloseField: false,
      alias: 'from_date'
    }, {
      field: 'DATE_FORMAT(LI.endDate, "%m/%d/%Y")',
      encloseField: false,
      alias: 'to_date'
    }, {
      field: 'CASE WHEN leaveStatus = 0 THEN "incomplete" WHEN leaveStatus = 1 THEN "open" WHEN leaveStatus = 2 THEN "closed" ELSE "" END',
      encloseField: false,
      alias: 'status'
    }],
    filter: {
      field: 'pk_empID',
      operator: 'eq',
      value: ''
    }
  },
  getEmployeeLeaveClaimInfoServiceByClaimNumberQuery: {
    join: {
      table: tbl_EmployeeLeave,
      alias: 'EL',
      joinwith: [{
        table: tbl_LeaveInfo,
        alias: 'LI',
        joincondition: {
          table: 'EL',
          field: 'leaveInfoId',
          operator: 'eq',
          value: {
            table: 'LI',
            field: 'pk_leaveInfoId'
          }
        }
      }]
    },
    select: [{
      field: 'EL.empId',
      encloseField: false,
      alias: 'emp_id'
    }, {
      field: 'pk_leaveInfoId',
      alias: 'leave_info_id'
    }, {
      field: 'leaveType',
      alias: 'leave_type'
    }, {
      field: 'LI.leaveTypeStatus',
      encloseField: false,
      alias: 'leave_type_status'
    }, {
      field: 'leaveReason',
      alias: 'leave_reason'
    }, {
      field: 'DATE_FORMAT(LI.startDate, "%m/%d/%Y")',
      encloseField: false,
      alias: 'from_date'
    }, {
      field: 'DATE_FORMAT(LI.endDate, "%m/%d/%Y")',
      encloseField: false,
      alias: 'to_date'
    }, {
      field: 'DATE_FORMAT(LI.startDate, "%Y-%m-%d")',
      encloseField: false,
      alias: 'from_date_db'
    }, {
      field: 'DATE_FORMAT(LI.endDate, "%Y-%m-%d")',
      encloseField: false,
      alias: 'to_date_db'
    }, {
      field: '"open"',
      encloseField: false,
      alias: 'status'
    }, {
      field: 'GROUP_CONCAT(leave_name SEPARATOR "\n")',
      encloseField: false,
      alias: 'leave_name'
    }, {
      field: 'IFNULL(ERTW_userId, 0)',
      encloseField: false,
      alias: 'ERTW_userId'
    }, {
      field: 'IFNULL(DATE_FORMAT(ERTWDate,  "%m/%d/%Y"), "MM/DD/YYYY")',
      encloseField: false,
      alias: 'ERTWDate'
    }, {
      field: 'IFNULL(ARTW_userId, 0)',
      encloseField: false,
      alias: 'ARTW_userId'
    }, {
      field: 'IFNULL(DATE_FORMAT(ARTWDate,  "%m/%d/%Y"), "MM/DD/YYYY")',
      encloseField: false,
      alias: 'ARTWDate'
    }],
    filter: {
      field: 'pk_leaveInfoId',
      operator: 'eq',
      value: ''
    },
    group_by: [{
      field: 'pk_leaveInfoId'
    }],
  },
  getEmployeeLeavePlanSummaryMaxDurationByClaimNumberQuery: {
    table: tbl_EmployeeLeave,
    select: [{
      field: 'leave_name',
      alias: 'leave_name'
    }, {
      field: 'IFNULL(maximum_duration, "Unlimited")',
      encloseField: false,
      alias: 'maximum_duration'
    }],
    filter: {
      field: 'leaveInfoId',
      operator: 'eq',
      value: ''
    },
  },
  getEmployeeLeavePlanStatusByClaimNumberQuery: {
    table: tbl_EmployeeLeave,
    select: [{
      field: 'leave_name',
      alias: 'leave_name'
    }, {
      field: 'DATE_FORMAT(from_date, "%m/%d/%Y")',
      encloseField: false,
      alias: 'from_date'
    }, {
      field: 'DATE_FORMAT(to_date, "%m/%d/%Y")',
      encloseField: false,
      alias: 'to_date'
    }],
    filter: {
      field: 'leaveInfoId',
      operator: 'eq',
      value: ''
    },
  },
  /* edit leave_info by leave_info_id query start */
  editLeaveInfoByLeaveInfoIdQuery: {
    table: tbl_LeaveInfo,
    update: [],
    filter: {
      field: 'pk_leaveInfoId',
      operator: 'EQ',
      value: ''
    },
  }, // edit leave_info by leave_info_id query end
  /* edit employee_leave by leave_info_id query start */
  editEmployeeLeaveByLeaveInfoIdQuery: {
    table: tbl_EmployeeLeave,
    update: [],
    filter: {
      field: 'leaveInfoId',
      operator: 'EQ',
      value: ''
    },
  }, // edit employee_leave by leave_info_id query end
  /* check employee exist or not by employee id query start */
  checkEmployeeExistOrNotByEmployeeIdQuery: {
    table: tbl_LocationMaster,
    select: [{
      field: 'pk_locationId',
      alias: 'location_id'
    }],
    filter: {
      field: 'employeeId',
      operator: 'EQ',
      value: ''
    },
  }, // check employee exist or not by employee id query end
  /* leave close by leave info id query start*/
  leaveCloseByLeaveInfoIdQuery: {
    table: tbl_LeaveInfo,
    update: [{
      field: 'leaveStatus',
      fValue: 2
    }],
    filter: {
      field: 'pk_leaveInfoId',
      operator: 'EQ',
      value: ''
    },
  }, // leave close by leave info id query end
  /* get employee leave provider by leave_info_id query start */
  getEmployeeLeaveProviderByLeaveInfoIdQuery: {
    table: tbl_LeaveInfo,
    select: [{
      field: 'pk_leaveInfoId',
      alias: 'leave_info_id'
    }, {
      field: 'IFNULL(leaveReason, "")',
      encloseField: false,
      alias: 'leaveReason'
    }, {
      field: 'IFNULL(familyFirst, "")',
      encloseField: false,
      alias: 'familyFirst'
    }, {
      field: 'IFNULL(familyLast, "")',
      encloseField: false,
      alias: 'familyLast'
    }, {
      field: 'IFNULL(DATE_FORMAT(familyMemberDOB, "%m/%d/%Y"), "")',
      encloseField: false,
      alias: 'familyMemberDOB'
    }, {
      field: 'IFNULL(familyRelation, "")',
      encloseField: false,
      alias: 'familyRelation'
    }, {
      field: 'IFNULL(inLocoParent, "")',
      encloseField: false,
      alias: 'inLocoParent'
    }, {
      field: 'IFNULL(providerName, "")',
      encloseField: false,
      alias: 'providerName'
    }, {
      field: 'IFNULL(providerType, "")',
      encloseField: false,
      alias: 'providerType'
    }, {
      field: 'IFNULL(providePhone, "")',
      encloseField: false,
      alias: 'providePhone'
    }, {
      field: 'IFNULL(provideFax, "")',
      encloseField: false,
      alias: 'provideFax'
    }, {
      field: 'IFNULL(provideAddress, "")',
      encloseField: false,
      alias: 'provideAddress'
    }, {
      field: 'IFNULL(startDate, "")',
      encloseField: false,
      alias: 'startDate'
    }, {
      field: 'IFNULL(endDate, "")',
      encloseField: false,
      alias: 'endDate'
    }, {
      field: 'IFNULL(leaveType, "")',
      encloseField: false,
      alias: 'leaveType'
    }],
    filter: {
      field: 'pk_leaveInfoId',
      operator: 'EQ',
      value: ''
    },
  }, // get employee leave provider by leave_info_id query end
  /* get employee leave eligibility  by leave_info_id query start */
  getEmployeeLeaveEligibilityByLeaveInfoIdQuery: {
    table: tbl_EmployeeLeave,
    select: [{
      field: 'empId',
      alias: 'empId'
    }, {
      field: 'leaveInfoId',
      alias: 'leaveInfoId'
    }, {
      field: 'leaveId',
      alias: '_comment'
    }, {
      field: 'leave_name',
      alias: 'leave_name'
    }, {
      field: 'state',
      alias: 'state'
    }, {
      field: 'eligibility',
      alias: 'eligibilityData'
    }, {
      field: 'qualifying_reason',
      alias: 'qualifying_reason'
    }, {
      field: 'leave_type',
      alias: 'leave_type'
    }, {
      field: 'maximum_duration',
      alias: 'maximum_duration'
    }, {
      field: 'from_date',
      alias: 'from_date'
    }, {
      field: 'to_date',
      alias: 'to_date'
    }, {
      field: 'leaveTypeStatus',
      alias: 'leaveTypeStatus'
    }],
    filter: {
      field: 'leaveInfoId',
      operator: 'EQ',
      value: ''
    },
  }, // get employee leave eligibility  by leave_info_id query end
  /* remove paper work review by leave_info_id start*/
  removePaperWorkReviewByLeaveInfoIdQuery: {
    table: tbl_PaperWorkReview,
    delete: [],
    filter: {
      field: 'leaveInfoId',
      operator: 'EQ',
      value: ''
    },
  }, // remove paper work review by leave_info_id query end
  /* add paper work review query start */
  addPaperWorkReviewQuery: {
    table: tbl_PaperWorkReview,
    insert: {
      field: ['leaveInfoId', 'paperWorkName', 'isPaperWorkReview'],
      fValue: []
    }
  }, // add paper work review query end
  /* get employee leave paper work review data by claim_number query start */
  getEmployeeLeavePaperWorkReviewDataByClaimNumberQuery: {
    table: tbl_PaperWorkReview,
    select: [{
      field: 'paperWorkName',
      alias: 'paperWorkName'
    }, {
      field: 'isPaperWorkReview',
      alias: 'isPaperWorkReview'
    }],
    filter: {
      field: 'leaveInfoId',
      operator: 'EQ',
      value: ''
    },
  }, // get employee leave paper work review data by claim_number query end
};

module.exports = query;