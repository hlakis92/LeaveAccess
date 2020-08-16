let tbl_EmployeeMaster = "tbl_EmployeeMaster";
let tbl_LocationMaster = "tbl_LocationMaster";
let tbl_LeaveInfo = "tbl_LeaveInfo";
let tbl_EmployeeLeave = "tbl_EmployeeLeave";
let tbl_EmployeeWorkScheduleMapping = "tbl_EmployeeWorkScheduleMapping";
let tbl_PaperWorkReview = "tbl_PaperWorkReview";
let tbl_PaperWorkReviewDocument = "tbl_PaperWorkReviewDocument";
let tbl_LeaveDeterminationDecision = "tbl_LeaveDeterminationDecision";
let tbl_LeaveChronologyMapping = "tbl_LeaveChronologyMapping";
let tbl_UserMaster = "tbl_UserMaster";
let tbl_LeaveChronology = "tbl_LeaveChronology";
let tbl_tasklist = "tbl_tasklist";
let tbl_LeaveIntermittentUsage = "tbl_LeaveIntermittentUsage";

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
      field: ['empId', 'DOJ', 'employeeId', 'locationEmail', '_12MonthHours', 'address', 'city', 'state', 'pincode', 'supervisorContactName', 'supervisorContactNumber', 'supervisorContactEmail', 'HRContactName', 'HRContactNumber', 'HRContactEmail', 'PBContactName', 'PBContactNumber', 'PBContactEmail'],
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
  /* add employee leave query start */
  addEmployeeLeaveQuery: {
    table: tbl_EmployeeLeave,
    insert: {
      field: ['empId', 'leaveInfoId', 'leaveId', 'leave_name', 'state', 'eligibility', 'qualifying_reason', 'leave_type', 'maximum_duration', 'from_date', 'to_date'],
      fValue: []
    }
  }, // add employee leave query end
  /* remove employee leave query start */
  removeEmployeeLeaveQuery: {
    table: tbl_EmployeeLeave,
    delete: [],
    filter: {
      field: 'leaveInfoId',
      operator: 'EQ',
      value: ''
    },
  }, // remove employee leave query end
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
  /* get employee leave claim info by claim_number query start */
  getEmployeeLeaveClaimInfoByClaimNumberQuery: {
    join: {
      table: tbl_EmployeeMaster,
      alias: 'EM',
      joinwith: [{
        table: tbl_LocationMaster,
        alias: 'LM',
        joincondition: {
          table: 'EM',
          field: 'pk_empID',
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
          table: 'EM',
          field: 'pk_empID',
          operator: 'eq',
          value: {
            table: 'LI',
            field: 'empId'
          }
        }
      }]
    },
    select: [{
      field: 'pk_empID',
      encloseField: false,
      alias: 'empId'
    }, {
      field: 'CONCAT(firstName," ",lastName)',
      encloseField: false,
      alias: 'employeeName'
    }, {
      field: 'IFNULL(supervisorContactName, "-")',
      encloseField: false,
      alias: 'supervisorContactName'
    }],
    filter: {
      field: 'pk_leaveInfoId',
      operator: 'eq',
      value: ''
    }
  }, // get employee leave claim info by claim_number query end
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
      field: 'IFNULL(DATE_FORMAT(DATE_ADD(LI.endDate, INTERVAL -7 DAY),  "%m/%d/%Y"), "MM/DD/YYYY")',
      encloseField: false,
      alias: 'ERTWDate'
    }, {
      field: 'IF(ERTWDate IS NULL, 0, 1)',
      encloseField: false,
      alias: 'is_ERTWDate_complete'
    }, {
      field: 'IFNULL(ARTW_userId, 0)',
      encloseField: false,
      alias: 'ARTW_userId'
    }, {
      field: 'IFNULL(DATE_FORMAT(LI.endDate,  "%m/%d/%Y"), "MM/DD/YYYY")',
      encloseField: false,
      alias: 'ARTWDate'
    }, {
      field: 'IF(ARTWDate IS NULL, 0, 1)',
      encloseField: false,
      alias: 'is_ARTWDate_complete'
    }, {
      field: 'IFNULL(PR_userId, 0)',
      encloseField: false,
      alias: 'PR_userId'
    }, {
      field: 'IFNULL(DATE_FORMAT(DATE_ADD(PRDate, INTERVAL 1 DAY),  "%m/%d/%Y"), "MM/DD/YYYY")',
      encloseField: false,
      alias: 'PRDate'
    }, {
      field: 'IF(PRDate IS NULL, 0, 1)',
      encloseField: false,
      alias: 'is_PRDate_complete'
    }, {
      field: 'IFNULL(D_userId, 0)',
      encloseField: false,
      alias: 'D_userId'
    }, {
      field: 'IFNULL(DATE_FORMAT(DATE_ADD(createdDate, INTERVAL 15 DAY),  "%m/%d/%Y"), "MM/DD/YYYY")',
      encloseField: false,
      alias: 'DDate'
    }, {
      field: 'IF(DDate IS NULL, 0, 1)',
      encloseField: false,
      alias: 'is_DDate_complete'
    }, {
      field: 'IFNULL(E_userId, 0)',
      encloseField: false,
      alias: 'E_userId'
    }, {
      field: 'IFNULL(DATE_FORMAT(DATE_ADD(createdDate, INTERVAL 1 DAY),  "%m/%d/%Y"), "MM/DD/YYYY")',
      encloseField: false,
      alias: 'EDate'
    }, {
      field: 'IF(EDate IS NULL, 0, 1)',
      encloseField: false,
      alias: 'is_EDate_complete'
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
    }, {
      field: 'eligibility',
      encloseField: false,
      alias: 'eligibility'
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
      field: 'DATE_FORMAT(from_date, "%Y-%m-%d")',
      encloseField: false,
      alias: 'from_date'
    }, {
      field: 'DATE_FORMAT(to_date, "%Y-%m-%d")',
      encloseField: false,
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
  /* get employee leave paper work review document data by claim_number query start */
  getEmployeeLeavePaperWorkReviewDocumentDataByClaimNumberQuery: {
    table: tbl_PaperWorkReviewDocument,
    select: [{
      field: 'documentName',
      alias: 'text'
    }, {
      field: 'documentName',
      alias: 'url'
    }],
    filter: {
      field: 'leaveInfoId',
      operator: 'EQ',
      value: ''
    },
  }, // get employee leave paper work review document data by claim_number query end
  /* add leave  determination decision query start */
  addLeaveDeterminationDecisionQuery: {
    table: tbl_LeaveDeterminationDecision,
    insert: {
      field: ['fk_empId', 'fk_leaveInfoId', 'startDate', 'endDate', 'leaveTypeStatus'],
      fValue: []
    }
  }, //  add leave  determination decision query end
  getEmployeeAndLeaveInfoByLeaveInfoIdQuery: {
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
      field: 'firstName',
      alias: 'first_name'
    }, {
      field: 'lastName',
      alias: 'last_name'
    }, {
      field: 'email',
      alias: 'email'
    }, {
      field: 'EM.address1',
      encloseField: false,
      alias: 'address1'
    }, {
      field: 'EM.address2',
      encloseField: false,
      alias: 'address2'
    }, {
      field: 'EM.cityName',
      encloseField: false,
      alias: 'city'
    }, {
      field: 'EM.stateName',
      encloseField: false,
      alias: 'state'
    }, {
      field: 'EM.pincode',
      encloseField: false,
      alias: 'pincode'
    }, {
      field: 'leaveType',
      encloseField: false,
      alias: 'leave_type_of_leave'
    }, {
      field: 'leaveTypeStatus',
      encloseField: false,
      alias: 'leave_type_status'
    }, {
      field: 'DATE_FORMAT(startDate, "%m/%d/%Y")',
      encloseField: false,
      alias: 'startDate'
    }, {
      field: 'DATE_FORMAT(endDate, "%m/%d/%Y")',
      encloseField: false,
      alias: 'endDate'
    }],
    filter: {
      field: 'pk_leaveInfoId',
      operator: 'EQ',
      value: ''
    },
  },
  /* add leave chronology add query */
  addLeaveChronologyQuery: {
    table: tbl_LeaveChronologyMapping,
    insert: {
      field: ['leaveType', 'fk_leaveChronologyId', 'fk_leaveInfoId', 'data', 'fk_createdBy'],
      fValue: []
    }
  },
  /* get leave chronology by leave info id query start */
  getLeaveChronologyByLeaveInfoIdQuery: {
    join: {
      table: tbl_LeaveChronology,
      alias: 'LC',
      joinwith: [{
        table: tbl_LeaveChronologyMapping,
        alias: 'LCM',
        joincondition: {
          table: 'LC',
          field: 'pk_leaveChronologyId',
          operator: 'eq',
          value: {
            table: 'LCM',
            field: 'fk_leaveChronologyId'
          }
        }
      }, {
        table: tbl_UserMaster,
        alias: 'UM',
        joincondition: {
          table: 'LCM',
          field: 'fk_createdBy',
          operator: 'eq',
          value: {
            table: 'UM',
            field: 'pk_userID'
          }
        }
      }]
    },
    select: [{
      field: 'processName',
      alias: 'processName'
    }, {
      field: 'processTemplate',
      alias: 'processTemplate'
    }, {
      field: 'data',
      alias: 'data'
    }, {
      field: 'DATE_FORMAT(createdDate, "%m/%d/%Y")',
      encloseField: false,
      alias: 'date'
    }, {
      field: 'DATE_FORMAT(createdDate, "%h:%i%p")',
      encloseField: false,
      alias: 'time'
    }, {
      field: 'createdDate',
      encloseField: false,
      alias: 'datetime'
    }, {
      field: 'name',
      encloseField: false,
      alias: 'name'
    }],
    filter: {
      field: 'fk_leaveInfoId',
      operator: 'EQ',
      value: ''
    },
  },

  getEmployeeTaskListByClaimNumberQuery: {
    table: tbl_tasklist,
    select: [{
      field: 'pk_taskId',
      alias: 'taskId'
    }, {
      field: 'taskName',
      alias: 'taskName'
    }, {
      field: 'DATE_FORMAT(dueDate, "%m/%d/%Y")',
      encloseField: false,
      alias: 'dueDate'
    }],
    filter: {
      and: [{
        field: 'leaveInfoId',
        operator: 'EQ',
        value: ''
      }, {
        field: 'status',
        operator: 'EQ',
        value: 0
      }]
    },
  },
  removeIntermittentTimeByLeveInfoIdAndDateQuery: {
    table: tbl_LeaveIntermittentUsage,
    delete: [],
    filter: {
      and: [{
        field: 'fk_leaveInfoId',
        operator: 'EQ',
        value: ''
      }, {
        field: 'date',
        operator: 'EQ',
        value: 0
      }]
    },
  },
  addIntermittentTimeQuery: {
    table: tbl_LeaveIntermittentUsage,
    insert: {
      field: ["fk_leaveInfoId", "param", "date", "hours", "status", "comment"],
      fValue: []
    }
  },
  getIntermittentTimeByLeveInfoIdAndDateQuery: {
    table: tbl_LeaveIntermittentUsage,
    select: [{
      field: 'param',
      alias: 'param'
    }, {
      field: 'DATE_FORMAT(date, "%Y-%m-%d")',
      encloseField: false,
      alias: 'date'
    }, {
      field: 'hours',
      alias: 'hours'
    }, {
      field: 'status',
      alias: 'status'
    }, {
      field: 'comment',
      alias: 'comment'
    }],
    filter: {
      and: [{
        field: 'fk_leaveInfoId',
        operator: 'EQ',
        value: ''
      }, {
        field: 'date',
        operator: 'EQ',
        value: 0
      }]
    },
  },
};

module.exports = query;