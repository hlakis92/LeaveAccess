let tbl_tasklist = "tbl_tasklist";
let tbl_EmployeeMaster = "tbl_EmployeeMaster";
let tbl_usermaster = "tbl_UserMaster";
let tbl_LeaveInfo = "tbl_LeaveInfo";
let tbl_notes = "tbl_notes";
let query = {

  /* create task query start */
  addTaskQuery: {
    table: tbl_tasklist,
    insert: {
      field: ["userId", "taskName", "status", "taskDesc", "empId", "leaveInfoId", "dueDate", "modifyBy"],
      fValue: []
    }
  }, // create task query end
  /* edit task query start */
  editTaskQueryByTaskIdQuery: {
    table: tbl_tasklist,
    update: [],
    filter: {
      field: 'pk_taskId',
      operator: 'EQ',
      value: ''
    },
  }, // edit task query end
  // Tasklist
  getTaskListQuery: {
    join: {
      table: tbl_tasklist,
      alias: 'tl',
      joinwith: [{
        table: tbl_EmployeeMaster,
        alias: 'EM',
        joincondition: {
          table: 'EM',
          field: 'pk_empID',
          operator: 'eq',
          value: {
            table: 'tl',
            field: 'empId'
          }
        }
      }, {
        table: tbl_LeaveInfo,
        alias: 'LI',
        joincondition: {
          table: 'LI',
          field: 'pk_leaveInfoId',
          operator: 'eq',
          value: {
            table: 'tl',
            field: 'leaveInfoId'
          }
        }
      }, {
        table: tbl_usermaster,
        alias: 'UM',
        joincondition: {
          table: 'UM',
          field: 'pk_userID',
          operator: 'eq',
          value: {
            table: 'tl',
            field: 'userId'
          }
        }
      }]
    },
    select: [{
      field: 'pk_taskId',
      alias: 'taskId'
    }, {
      field: 'pk_empID',
      alias: 'empId'
    }, {
      field: 'userId',
      alias: 'userId'
    }, {
      field: 'pk_leaveInfoId',
      alias: 'leave_info_id'
    }, {
      field: 'leaveType',
      alias: 'leave_type'
    }, {
      field: 'firstName',
      alias: 'empName'
    }, {
      field: 'name',
      alias: 'name'
    }, {
      field: 'taskName',
      alias: 'taskName'
    }, {
      field: 'taskDesc',
      alias: 'taskDesc'
    }, {
      field: 'DATE_FORMAT(dueDate, "%m/%d/%Y")',
      encloseField: false,
      alias: 'dueDate'
    }, {
      field: 'DATE_FORMAT(dueDate, "%Y-%m-%d")',
      encloseField: false,
      alias: 'dueDateDB'
    }, {
      field: 'CASE WHEN tl.status = 0 THEN "Created" WHEN tl.status = 1 THEN "Completed" ELSE "" END',
      encloseField: false,
      alias: 'status'
    }, {
      field: 'tl.status',
      encloseField: false,
      alias: 'statusType'
    }],
    /*filter: {
      field: 'pk_empID',
      operator: 'eq',
      value: ''
    }*/
  },
  addNotesQuery: {
    table: tbl_notes,
    insert: {
      field: ["userId", "notes", "empId", "leaveInfoId", "modifyBy"],
      fValue: []
    }
  }, // create task query end
  updateNotesQuery: {
    table: tbl_notes,
    update: [],
    filter: {
      field: 'pk_noteId',
      operator: 'EQ',
      value: ''
    },
  }, // create task query end
  getNotesListQuery: {
    join: {
      table: tbl_notes,
      alias: 'tn',
      joinwith: [{
        table: tbl_EmployeeMaster,
        alias: 'EM',
        joincondition: {
          table: 'EM',
          field: 'pk_empID',
          operator: 'eq',
          value: {
            table: 'tn',
            field: 'empId'
          }
        }
      }, {
        table: tbl_usermaster,
        alias: 'UM',
        joincondition: {
          table: 'UM',
          field: 'pk_userID',
          operator: 'eq',
          value: {
            table: 'tn',
            field: 'userId'
          }
        }
      }]
    },
    select: [{
      field: 'pk_noteId',
      alias: 'noteId'
    }, {
      field: 'firstName',
      alias: 'empName'
    }, {
      field: 'notes',
      alias: 'notes'
    }, {
      field: 'userId',
      alias: 'userId'
    }, {
      field: 'DATE_FORMAT(tn.createdDate, "%m/%d/%Y")',
      encloseField: false,
      alias: 'createdDate'
    }],
    /*filter: {
      field: 'pk_empID',
      operator: 'eq',
      value: ''
    }*/
  },

  getNotesQuery: {
    join: {
      table: tbl_notes,
      alias: 'tn',
      joinwith: [{
        table: tbl_EmployeeMaster,
        alias: 'EM',
        joincondition: {
          table: 'EM',
          field: 'pk_empID',
          operator: 'eq',
          value: {
            table: 'tn',
            field: 'empId'
          }
        }
      }, {
        table: tbl_usermaster,
        alias: 'UM',
        joincondition: {
          table: 'UM',
          field: 'pk_userID',
          operator: 'eq',
          value: {
            table: 'tn',
            field: 'userId'
          }
        }
      }]
    },
    select: [{
      field: 'pk_noteId',
      alias: 'noteId'
    }, {
      field: 'firstName',
      alias: 'empName'
    }, {
      field: 'notes',
      alias: 'notes'
    }, {
      field: 'DATE_FORMAT(tn.createdDate, "%m/%d/%Y")',
      encloseField: false,
      alias: 'createdDate'
    }],
    filter: {
      field: 'pk_noteId',
      operator: 'eq',
      value: ''
    }
  },
};

module.exports = query;