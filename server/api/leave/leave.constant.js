exports.leaveMatrix = [{
  _comment: 1,
  state: 'federal',
  leave_name: 'Family and Medical Leave Act (FMLA)',
  eligibility: {
    month: 12,
    hours: 1250
  },
  qualifying_reason: [
    'employees own health condition',
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
}, {
  _comment: 19,
  state: 'florida',
  leave_name: 'Domestic Violence Leave',
  eligibility: {
    month: 3,
  },
  qualifying_reason: [
    "employees own health condition",
    "family members health condition"
  ],
  leave_type: ['intermittent'],
  maximum_duration: {value: 3, granularityType: 'days'}
}, {
  _comment: 24,
  state: 'illinois',
  leave_name: 'VESSA',
  eligibility: {
    state: 'illinois',
  },
  qualifying_reason: [
    "employees own health condition",
    "family members health condition"
  ],
  leave_type: ['intermittent'],
  maximum_duration: {value: 84, granularityType: 'days'}
}, {
  _comment: 29,
  state: 'indiana',
  leave_name: 'Military Leave',
  eligibility: {
    state: 'indiana',
  },
  qualifying_reason: [
    "military"
  ],
  leave_type: ['intermittent'],
  maximum_duration: {value: 15, granularityType: 'days'}
}, {
  _comment: 33,
  state: 'iowa',
  leave_name: 'Pregnancy Disability',
  eligibility: {
    state: 'iowa',
  },
  qualifying_reason: [
    "maternity leave"
  ],
  leave_type: ['all'],
  maximum_duration: {value: 56, granularityType: 'days'}
}];