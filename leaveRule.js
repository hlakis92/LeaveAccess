let DateLibrary = require('date-management');
let rule = [{
  _comment: 1,
  state: 'federal',
  leave_name: 'Family and Medical Leave Act (FMLA)',
  eligibility: {
    month: 12,
    hours: 1250
  },
  qualifying_reason: [
    'own health condition',
    'family member health',
    'care for newborn',
    'maternity'
  ],
  leave_type: ['all'],
  maximum_duration: {value: 84, granularityType: 'days'}
}, {
  _comment: 2,
  state: 'federal',
  leave_name: 'USERRA',
  eligibility: {state: 'federal'},
  qualifying_reason: [
    'military'
  ],
  leave_type: ['continuous'],
  maximum_duration: {value: 5, granularityType: 'years'}
}, {
  _comment: 3,
  state: 'Military Leave',
  leave_name: 'XXX',
  eligibility: {state: 'alabama'},
  qualifying_reason: [
    'military'
  ],
  leave_type: ['all'],
  maximum_duration: {value: 168, granularityType: 'hours'}
}, {
  _comment: 4,
  state: 'alabama',
  leave_name: 'Victims Of Crime Leave',
  eligibility: {state: 'alabama'},
  qualifying_reason: [
    'legal/court proceedings'
  ],
  leave_type: ['all'],
  maximum_duration: undefined
}, {
  _comment: 5,
  state: 'california',
  leave_name: 'Witness and Crime Victim Leave',
  eligibility: {state: 'california'},
  qualifying_reason: [
    'legal/court proceedings'
  ],
  leave_type: ['all'],
  maximum_duration: undefined
}, {
  _comment: 6,
  state: 'california',
  leave_name: 'Domestic Violence and Sexual Assault Victim Leave',
  eligibility: {state: 'california'},
  qualifying_reason: [
    'domestic violence'
  ],
  leave_type: ['all'],
  maximum_duration: undefined
}, {
  _comment: 7,
  state: 'california',
  leave_name: 'Military Leave',
  eligibility: {state: 'california'},
  qualifying_reason: [
    'military'
  ],
  leave_type: ['all'],
  maximum_duration: {value: 17, granularityType: 'days'}
}, {
  _comment: 8,
  state: 'california',
  leave_name: 'Family Military Leave',
  eligibility: {state: 'california'},
  qualifying_reason: [
    'family military exigency'
  ],
  leave_type: ['continuous'],
  maximum_duration: {value: 10, granularityType: 'days'}
}, {
  _comment: 9,
  state: 'california',
  leave_name: 'Family-School Partnership Leave',
  eligibility: {state: 'california'},
  qualifying_reason: [
    'school activities'
  ],
  leave_type: ['intermittent'],
  maximum_duration: {value: 40, granularityType: 'hours'}
}, {
  _comment: 14,
  state: 'california',
  leave_name: 'PDL',
  eligibility: {state: 'california'},
  qualifying_reason: [
    'maternity'
  ],
  leave_type: ['all'],
  maximum_duration: {value: 112, granularityType: 'days'}
}, {
  _comment: 15,
  state: 'california',
  leave_name: 'CFRA',
  eligibility: {
    month: 12,
    hours: 1250
  },
  qualifying_reason: [
    "employees own health condition",
    "to care for a family member",
    "care for a newborn",
    "maternity"
  ],
  leave_type: ['all'],
  maximum_duration: {value: 84, granularityType: 'days'}
}];


let k = {
  locationState: 'federal',
  last_12_month_work: 1250,
  service_period_in_month: 12,
  leave_type: 'continuous',
  type_of_leave: 'maternity',
  from_date: '2019-01-01',
  to_date: '2019-06-05',
};

let eligibileLeave = [];

function checkLeaveEligibilty(){
  rule.forEach(ruleData => {
    let maxToDateForValidation;
    if (ruleData['maximum_duration'] !== undefined) {
      maxToDateForValidation =
        DateLibrary.getRelativeDate(new Date(k['from_date']),
          {
            operationType: "Absolute_DateTime",
            granularityType: ruleData['maximum_duration']['granularityType'], value: ruleData['maximum_duration']['value']
          });
    }

    // console.log(maxToDateForValidation);
    if (ruleData['state'] === k['locationState'] &&
      (ruleData['eligibility'].hasOwnProperty('state') === k['locationState'] ||
        (ruleData['eligibility'].hasOwnProperty('hours') === true && ruleData['eligibility']['hours'] <= k['last_12_month_work'] &&
          ruleData['eligibility'].hasOwnProperty('month') === true && ruleData['eligibility']['month'] <= k['service_period_in_month'])
      ) &&
      ruleData['qualifying_reason'].includes(k['type_of_leave']) === true &&
      (ruleData['leave_type'].includes('all') === true || ruleData['leave_type'].includes(k['leave_type']) === true) &&
      (maxToDateForValidation !== undefined || (new Date(maxToDateForValidation)).getTime() <= new Date(k['to_date']).getTime())
    ) {
      console.log("pass..................", ruleData);
    }
  });
}

