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
    'family members health condition',
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
  state: 'alabama',
  leave_name: 'Military Leave',
  eligibility: {state: 'alabama'},
  qualifying_reason: [
    'military'
  ],
  leave_type: ['all'],
  maximum_duration: {value: 168, granularityType: 'hours'}
}, {
  _comment: 4,
  state: 'arizona',
  leave_name: 'Victims Of Crime Leave',
  eligibility: {state: 'arizona'},
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
  _comment: 10,
  state: 'california',
  leave_name: 'Rehabilitation Leave',
  eligibility: {state: 'california'},
  qualifying_reason: [
    'employees own health condition',
  ],
  leave_type: ['all'],
  maximum_duration: undefined
}, {
  _comment: 11,
  state: 'california',
  leave_name: 'Disaster and Emergency Services Leave',
  eligibility: {state: 'california'},
  qualifying_reason: [
    'emergency duty',
  ],
  leave_type: ['continuous'],
  maximum_duration: undefined
}, {
  _comment: 12,
  state: 'california',
  leave_name: 'Civil Air Patrol',
  eligibility: {month: 3},
  qualifying_reason: [
    'military duty',
  ],
  leave_type: ['continuous'],
  maximum_duration: undefined
}, {
  _comment: 13,
  state: 'california',
  leave_name: 'Organ and Bone Marrow Donation Leave',
  eligibility: {month: 3},
  qualifying_reason: [
    'marrow/organ/blood donation',
  ],
  leave_type: ['continuous'],
  maximum_duration: undefined
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
    "care for newborn",
    'maternity'
  ],
  leave_type: ['all'],
  maximum_duration: {value: 84, granularityType: 'days'}
}, {
  _comment: 16,
  state: 'colorado',
  leave_name: '"Colorado Family Care Act"',
  eligibility: {
    month: 12,
    hours: 1250
  },
  qualifying_reason: [
    "to care for a family member"
  ],
  leave_type: ['all'],
  maximum_duration: {value: 84, granularityType: 'days'}
}, {
  _comment: 17,
  state: 'colorado',
  leave_name: 'Domestic Violence, Stalking, and Sexual Assault Leave',
  eligibility: {state: 'colorado'},
  qualifying_reason: [
    'domestic violence'
  ],
  leave_type: ['intermittent'],
  maximum_duration: {value: 3, granularityType: 'days'}
}, {
  _comment: 18,
  state: "colorado",
  leave_name: "Court Attendance and Crime Victims Leave",
  eligibility: {state: 'colorado'},
  qualifying_reason: ["victims of crime"],
  leave_type: ["intermittent"],
  maximum_duration: undefined
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
},
  {
    _comment: 20,
    state: "florida",
    leave_name: "Domestic Violence Leave",
    eligibility: {
      month: 3,
    },
    qualifying_reason: ["employees own health condition", "family members health condition"],
    leave_type: ["intermittent"],
    maximum_duration: {value: 3, granularityType: 'days'}
  },
  {
    _comment: 21,
    state: "georgia",
    leave_name: "Court Appearances Leave",
    eligibility: {state: "georgia"},
    qualifying_reason: ["legal/court proceedings"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 22,
    state: "illinois",
    leave_name: "Family Military",
    eligibility: {
      month: 3,
      hours: 1250
    },
    qualifying_reason: ["family military exigency"],
    leave_type: ["continuous"],
    maximum_duration: {value: 15, granularityType: 'days'}
  },
  {
    _comment: 23,
    state: "illinois",
    leave_name: "School Visitation Leave",
    eligibility: {
      month: 6,
    },
    qualifying_reason: ["school activities"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
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
    _comment: 25,
    state: "illinois",
    leave_name: "Blood Donor",
    eligibility: {month: 6},
    qualifying_reason: ["marrow/organ/blood donation"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 26,
    state: "illinois",
    leave_name: "Child Bereavement",
    eligibility: {month: 12, hours: 1250},
    qualifying_reason: ["bereavement"],
    leave_type: ["continuous"],
    maximum_duration: undefined
  },
  {
    _comment: 27,
    state: "illinois",
    leave_name: "Emergency Services Leave",
    eligibility: {state: "illinois"},
    qualifying_reason: ["emergency duty"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 28,
    state: "indiana",
    leave_name: "Witness Duty",
    eligibility: {state: "indiana"},
    qualifying_reason: ["legal/court proceedings"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
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
  },
  {
    _comment: 30,
    state: "indiana",
    leave_name: "Family Military",
    eligibility: {month: 12, hours: 1500},
    qualifying_reason: ["family military exigency"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 31,
    state: "indiana",
    leave_name: "Emergency Services Leave",
    eligibility: {state: "indiana"},
    qualifying_reason: ["emergency duty"],
    leave_type: ["all"],
    maximum_duration: {value: 6, granularityType: 'months'}
  },
  {
    _comment: 32,
    state: "indiana",
    leave_name: "Civil Air Patrol",
    eligibility: {state: "indiana"},
    qualifying_reason: ["emergency duty"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  }, {
    _comment: 33,
    state: 'iowa',
    leave_name: 'Pregnancy Disability',
    eligibility: {
      state: 'iowa',
    },
    qualifying_reason: [
      'maternity'
    ],
    leave_type: ['all'],
    maximum_duration: {value: 56, granularityType: 'days'}
  }, {
    _comment: 34,
    state: "iowa",
    leave_name: "Witness leave",
    eligibility: {state: "iowa",},
    qualifying_reason: ["legal/court proceedings"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 35,
    state: "iowa",
    leave_name: "Emergency response",
    eligibility: {state: "iowa"},
    qualifying_reason: ["emergency duty"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 36,
    state: "kansas",
    leave_name: "Military Service",
    eligibility: {state: "kansas"},
    qualifying_reason: ["military duty"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 37,
    state: "kansas",
    leave_name: "Emergency Responder",
    eligibility: {state: "kansas"},
    qualifying_reason: ["emergency duty"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 38,
    state: "kansas",
    leave_name: "Crime Victim Leave",
    eligibility: {state: "kansas"},
    qualifying_reason: ["domestic violence"],
    leave_type: ["intermittent"],
    maximum_duration: {value: 8, granularityType: 'days'}
  },
  {
    _comment: 39,
    state: "maryland",
    leave_name: "Civil Air Patrol",
    eligibility: {state: "maryland"},
    qualifying_reason: ["emergency duty"],
    leave_type: ["intermittent"],
    maximum_duration: {value: 15, granularityType: 'days'}
  },
  {
    _comment: 40,
    state: "maryland",
    leave_name: "Disaster and  Emergency Services Leave",
    eligibility: {state: "maryland"},
    qualifying_reason: ["emergency duty"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 41,
    state: "maryland",
    leave_name: "Family Military",
    eligibility: {month: 12, hours: 1050},
    qualifying_reason: ["family military exigency"],
    leave_type: ["intermittent"],
    maximum_duration: {value: 1, granularityType: 'days'}
  }, {
    _comment: 42,
    state: 'maryland',
    leave_name: 'Parental Leave Act',
    eligibility: {
      month: 12,
      hours: 1250
    },
    qualifying_reason: [
      "care for newborn"
    ],
    leave_type: ['all'],
    maximum_duration: {value: 42, granularityType: 'days'}
  }, {
    _comment: 43,
    state: 'massachusetts',
    leave_name: 'Parental Leave',
    eligibility: {
      month: 3
    },
    qualifying_reason: [
      "care for newborn", 'adoption', "employees own health condition",
    ],
    leave_type: ['continuous'],
    maximum_duration: {value: 56, granularityType: 'days'}
  }, {
    _comment: 44,
    state: "massachusetts",
    leave_name: "Parental Leave",
    eligibility: {month: 3},
    qualifying_reason: ["care for newborn","adoption"],
    leave_type: ["continuous"],
    maximum_duration: {value: 56, granularityType: 'days'}
  },
  {
    _comment: 45,
    state: "massachusetts",
    leave_name: "Small Necesities",
    eligibility: {month: 12, hours: 1250},
    qualifying_reason: ["school activities", "care for family member"],
    leave_type: ["intermittent", "continuous"],
    maximum_duration: {value: 84, granularityType: 'days'}
  },
  {
    _comment: 46,
    state: "massachusetts",
    leave_name: "Domestic Violence",
    eligibility: {state: "massachusetts"},
    qualifying_reason: ["domestic violence"],
    leave_type: ["all"],
    maximum_duration: {value: 15, granularityType: 'days'}
  },
  {
    _comment: 47,
    state: "michigan",
    leave_name: "Crime Victim and Witness Leave",
    eligibility: {state: "michigan"},
    qualifying_reason: ["legal/court proceedings"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  }, {
    _comment: 48,
    state: 'minnesota',
    leave_name: 'Pregnancy and Parenting',
    eligibility: {
      month: 12
    },
    qualifying_reason: [
      "care for newborn", 'maternity'
    ],
    leave_type: ['all'],
    maximum_duration: {value: 84, granularityType: 'days'}
  }, {
    _comment: 49,
    state: "minnesota",
    leave_name: "Witness and Crime  Victim Leave",
    eligibility: {state: "minnesota"},
    qualifying_reason: ["legal/court proceedings"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 50,
    state: "minnesota",
    leave_name: "Domestic Violence/ Harrassment Leave",
    eligibility: {state: "minnesota"},
    qualifying_reason: ["domestic violence", "legal/court proceedings"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 51,
    state: "minnesota",
    leave_name: "Political Activity",
    eligibility: {state: "minnesota"},
    qualifying_reason: ["political proceedings"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 52,
    state: "minnesota",
    leave_name: "School Conference and Activities",
    eligibility: {state: "minnesota"},
    qualifying_reason: ["school activities"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 53,
    state: "minnesota",
    leave_name: "Bone Marrow and Organ Donation",
    eligibility: {state: "minnesota"},
    qualifying_reason: ["marrow/organ/blood donation"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 54,
    state: "minnesota",
    leave_name: "Family Military",
    eligibility: {state: "minnesota"},
    qualifying_reason: ["family military exigency"],
    leave_type: ["all"],
    maximum_duration: {value: 10, granularityType: 'days'}
  },
  {
    _comment: 55,
    state: "minnesota",
    leave_name: "Election Workers Leave",
    eligibility: {state: "minnesota"},
    qualifying_reason: ["political proceedings"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 56,
    state: "minnesota",
    leave_name: "Civil Air Patrol",
    eligibility: {state: "minnesota", week_hours: 20},
    qualifying_reason: ["emergency duty"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 57,
    state: "minnesota",
    leave_name: "Voting Leave",
    eligibility: {state: "minnesota"},
    qualifying_reason: ["voting"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 58,
    state: "mississippi",
    leave_name: "Crime Victim Leave",
    eligibility: {state: "mississippi"},
    qualifying_reason: ["legal/court proceedings"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 59,
    state: "missouri",
    leave_name: "Crime Victim Leave",
    eligibility: {state: "missouri"},
    qualifying_reason: ["legal/court proceedings"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 60,
    state: "missouri",
    leave_name: "Voting Leave",
    eligibility: {state: "missouri"},
    qualifying_reason: ["voting"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 61,
    state: "montana",
    leave_name: "Crime Victim Leave",
    eligibility: {state: "montana"},
    qualifying_reason: ["legal/court proceedings"],
    leave_type: ["all"],
    maximum_duration: undefined
  }, {
    _comment: 62,
    state: 'montana',
    leave_name: 'Pregnancy Disability Leave',
    eligibility: {
      state: 'montana'
    },
    qualifying_reason: [
      'maternity'
    ],
    leave_type: ['all'],
    maximum_duration: undefined
  }, {
    _comment: 63,
    state: "nebraska",
    leave_name: "Election Workers Leave",
    eligibility: {state: "nebraska"},
    qualifying_reason: ["political proceedings"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 64,
    state: "nebraska",
    leave_name: "Family Military",
    eligibility: {month: 12, hours: 1250},
    qualifying_reason: ["family military exigency"],
    leave_type: ["all"],
    maximum_duration: {value: 30, granularityType: 'days'}
  },
  {
    _comment: 65,
    state: "nebraska",
    leave_name: "Military",
    eligibility: {state: "nebraska"},
    qualifying_reason: ["military duty"],
    leave_type: ["all"],
    maximum_duration: {value: 15, granularityType: 'days'}
  },
  {
    _comment: 66,
    state: "nebraska",
    leave_name: "Emergency Response Provider",
    eligibility: {state: "nebraska"},
    qualifying_reason: ["emergency duty"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  }, {
    _comment: 67,
    state: 'nebraska',
    leave_name: 'Pregnancy Accommodation',
    eligibility: {
      state: 'nebraska'
    },
    qualifying_reason: [
      'maternity'
    ],
    leave_type: ['all'],
    maximum_duration: undefined
  }, {
    _comment: 68,
    state: "nebraska",
    leave_name: "Voting Leave",
    eligibility: {state: "nebraska"},
    qualifying_reason: ["voting"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  }, {
    _comment: 69,
    state: 'nevada',
    leave_name: 'Military Leave',
    eligibility: {
      state: 'nevada'
    },
    qualifying_reason: [
      'military'
    ],
    leave_type: ['all'],
    maximum_duration: undefined
  }, {
    _comment: 70,
    state: 'nevada',
    leave_name: 'Pregancy Accommodation',
    eligibility: {
      state: 'nevada'
    },
    qualifying_reason: [
      'maternity'
    ],
    leave_type: ['all'],
    maximum_duration: undefined
  }, {
    _comment: 71,
    state: "nevada",
    leave_name: "School Activities Leave",
    eligibility: {state: "nevada"},
    qualifying_reason: ["school activities"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 72,
    state: "nevada",
    leave_name: "Domestic Violence Leave",
    eligibility: {month: 3},
    qualifying_reason: ["domestic violence"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 73,
    state: "nevada",
    leave_name: "Testimony Leave",
    eligibility: {month: 3},
    qualifying_reason: ["legal/court proceedings"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 74,
    state: "nevada",
    leave_name: "Voting Leave",
    eligibility: {state: "nevada"},
    qualifying_reason: ["voting"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 75,
    state: "new hampshire",
    leave_name: "Crime Victim Leave",
    eligibility: {state: "new hampshire"},
    qualifying_reason: ["legal/court proceedings"],
    leave_type: ["all"],
    maximum_duration: undefined
  }, {
    _comment: 76,
    state: 'new hampshire',
    leave_name: 'Pregnancy Disability Leave',
    eligibility: {
      state: 'new hampshire'
    },
    qualifying_reason: [
      'maternity'
    ],
    leave_type: ['all'],
    maximum_duration: undefined
  }, {
    _comment: 77,
    state: 'new jersey',
    leave_name: 'NJ Family Leave Act',
    eligibility: {
      month: 12,
      hours: 1000
    },
    qualifying_reason: [
      'care for newborn'
    ],
    leave_type: ['all'],
    maximum_duration: {value: 84, granularityType: 'days'}
  }, {
    _comment: 78,
    state: "new jersey",
    leave_name: "Victims of Domestic Violence Leave (SAFE Act)",
    eligibility: {month: 12, hours: 1000},
    qualifying_reason: ["domestic violence"],
    leave_type: ["all"],
    maximum_duration: {value: 20, granularityType: 'days'}
  }, {
    _comment: 79,
    state: 'new jersey',
    leave_name: 'NJ Family Leave Act',
    eligibility: {
      state: 'new jersey',
    },
    qualifying_reason: [
      'military'
    ],
    leave_type: ['all'],
    maximum_duration: {value: 3, granularityType: 'months'}
  }, {
    _comment: 80,
    state: "new mexico",
    leave_name: "Victims of Domestic Abuse Leave",
    eligibility: {state: "new mexico"},
    qualifying_reason: ["domestic violence"],
    leave_type: ["all"],
    maximum_duration: {value: 14, granularityType: 'days'}
  },
  {
    _comment: 81,
    state: "new mexico",
    leave_name: "Voting Leave",
    eligibility: {state: "new mexico"},
    qualifying_reason: ["voting"],
    leave_type: ["all"],
    maximum_duration: undefined
  }, {
    _comment: 82,
    state: 'new york',
    leave_name: 'Adoption Leave',
    eligibility: {
      state: 'new york',
    },
    qualifying_reason: [
      'adoption'
    ],
    leave_type: ['all'],
    maximum_duration: undefined
  }, {
    _comment: 83,
    state: 'new york',
    leave_name: 'Paid Family Leave',
    eligibility: {
      state: 'new york',
    },
    qualifying_reason: [
      'care for newborn', 'adoption'
    ],
    leave_type: ['all'],
    maximum_duration: {value: 70, granularityType: 'days'}
  },
  {
    _comment: 84,
    state: "new york",
    leave_name: "Blood and Bone Marrow Donation Leave",
    eligibility: {state: "new york"},
    qualifying_reason: ["marrow/organ/blood donation"],
    leave_type: ["intermittent", "reduced work schedule"],
    maximum_duration: undefined
  },
  {
    _comment: 85,
    state: "new york",
    leave_name: "Crime Victim Leave",
    eligibility: {state: "new york"},
    qualifying_reason: ["legal/court proceedings"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 86,
    state: "new york",
    leave_name: "Military Spouses' Leave",
    eligibility: {state: "new york"},
    qualifying_reason: ["family military exigency"],
    leave_type: ["all"],
    maximum_duration: {value: 10, granularityType: 'days'}
  },
  {
    _comment: 87,
    state: "new york",
    leave_name: "Emergency Responder Leave",
    eligibility: {state: "new york"},
    qualifying_reason: ["emergency duty"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 88,
    state: "north carolina",
    leave_name: "Disaster Leave",
    eligibility: {state: "north carolina"},
    qualifying_reason: ["emergency duty"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 89,
    state: "north carolina",
    leave_name: "Military",
    eligibility: {state: "north carolina"},
    qualifying_reason: ["military duty", "military"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 90,
    state: "north carolina",
    leave_name: "Parental Involvement",
    eligibility: {state: "north carolina"},
    qualifying_reason: ["school activities"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 91,
    state: "north carolina",
    leave_name: "Domestic Violence Leave",
    eligibility: {state: "north carolina"},
    qualifying_reason: ["legal/court proceedings"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 92,
    state: "north dakota",
    leave_name: "Testimony and Jury Duty Leave",
    eligibility: {state: "north dakota"},
    qualifying_reason: ["legal/court proceedings", "jury duty"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 93,
    state: "ohio",
    leave_name: "Crime Victim Leave",
    eligibility: {state: "ohio"},
    qualifying_reason: ["legal/court proceedings"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 94,
    state: "ohio",
    leave_name: "OH Family Military Leave",
    eligibility: {month: 12, hours: 1250},
    qualifying_reason: ["military", "military duty"],
    leave_type: ["all"],
    maximum_duration: {value: 10, granularityType: 'days'}
  },
  {
    _comment: 95,
    state: "ohio",
    leave_name: "Testimony Leave",
    eligibility: {state: "ohio"},
    qualifying_reason: ["legal/court proceedings"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 96,
    state: "ohio",
    leave_name: "First Responder Leave",
    eligibility: {state: "ohio"},
    qualifying_reason: ["emergency duty"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 97,
    state: "ohio",
    leave_name: "Voting Leave",
    eligibility: {state: "ohio"},
    qualifying_reason: ["voting"],
    leave_type: ["all"],
    maximum_duration: undefined
  }, {
    _comment: 98,
    state: 'ohio',
    leave_name: 'Pregnancy Disability Leave',
    eligibility: {
      state: 'ohio'
    },
    qualifying_reason: [
      'maternity'
    ],
    leave_type: ['all'],
    maximum_duration: undefined
  }, {
    _comment: 99,
    state: "oklahoma",
    leave_name: "OK Military",
    eligibility: {state: "oklahoma"},
    qualifying_reason: ["military duty"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 100,
    state: "oklahoma",
    leave_name: "Voting Leave",
    eligibility: {state: "oklahoma"},
    qualifying_reason: ["voting"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 101,
    state: "oregon",
    leave_name: "Bone Marrow Donation Leave",
    eligibility: {week_hours: 20},
    qualifying_reason: ["marrow/organ/blood donation"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 102,
    state: "oregon",
    leave_name: "Oregon Family Leave Act (OFLA)",
    eligibility: {month: 6, week_hours: 25},
    qualifying_reason: [
      "employees own health condition", "care for family member", "care for newborn", "beravement"],
    leave_type: ["all"],
    maximum_duration: {value: 84, granularityType: 'days'}
  },
  {
    _comment: 103,
    state: "oregon",
    leave_name: "Victims of Domestic Violence Leave",
    eligibility: {state: "oregon"},
    qualifying_reason: ["domestic violence"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 104,
    state: "oregon",
    leave_name: "Testimony Leave",
    eligibility: {month: 6, week_hours: 25},
    qualifying_reason: ["legal/court proceedings"],
    leave_type: ["all"],
    maximum_duration: undefined
  }, {
    _comment: 105,
    state: 'oregon',
    leave_name: 'Family Military Leave',
    eligibility: {
      state: 'oregon'
    },
    qualifying_reason: [
      'family military exigency'
    ],
    leave_type: ['all'],
    maximum_duration: undefined
  },
  {
    _comment: 106,
    state: "pennsylvania",
    leave_name: "Victims of Crime Leave",
    eligibility: {state: "pennsylvania"},
    qualifying_reason: ["legal/court proceedings"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 107,
    state: "pennsylvania",
    leave_name: "Emergency Response Leave",
    eligibility: {state: "pennsylvania"},
    qualifying_reason: ["emergency duty"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 108,
    state: "rhode island",
    leave_name: "Crime Victim Leave",
    eligibility: {state: "rhode island"},
    qualifying_reason: ["legal/court proceedings"],
    leave_type: ["all"],
    maximum_duration: undefined
  }, {
    _comment: 109,
    state: 'rhode island',
    leave_name: 'Family Military Leave',
    eligibility: {
      month: 12,
      hours: 1000
    },
    qualifying_reason: [
      'family military exigency'
    ],
    leave_type: ['all'],
    maximum_duration: {value: 30, granularityType: 'days'}
  }, {
    _comment: 110,
    state: 'rhode island',
    leave_name: 'Parental and Family Medical Leave (RI PFMLA)',
    eligibility: {
      month: 12
    },
    qualifying_reason: [
      'employees own health condition',
      'family members health condition',
    ],
    leave_type: ['continuous'],
    maximum_duration: {value: 91, granularityType: 'days'}
  }, {
    _comment: 111,
    state: "rhode island",
    leave_name: "School Involvement Leave",
    eligibility: {month: 12},
    qualifying_reason: ["school activities"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 112,
    state: "south carolina",
    leave_name: "Bone Marrow Donation Leave",
    eligibility: {week_hours: 20},
    qualifying_reason: ["marrow/organ/blood donation"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 113,
    state: "south carolina",
    leave_name: "Crime Victim Leave",
    eligibility: {state: "south carolina"},
    qualifying_reason: ["legal/court proceedings"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 114,
    state: "south dakota",
    leave_name: "Voting Leave",
    eligibility: {state: "south dakota"},
    qualifying_reason: ["voting"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 115,
    state: "tennessee",
    leave_name: "Volunteer Fire Fighter Leave",
    eligibility: {state: "tennessee"},
    qualifying_reason: ["emergency duty"],
    leave_type: ["all"],
    maximum_duration: undefined
  }, {
    _comment: 116,
    state: 'tennessee',
    leave_name: 'Parental Leave',
    eligibility: {
      month: 12
    },
    qualifying_reason: [
      'maternity',
      'adoption',
      'care for newborn'
    ],
    leave_type: ['continuous'],
    maximum_duration: {value: 4, granularityType: 'months'}
  }, {
    _comment: 117,
    state: "tennessee",
    leave_name: "Voting Leave",
    eligibility: {state: "tennessee"},
    qualifying_reason: ["voting"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 118,
    state: "texas",
    leave_name: "Military",
    eligibility: {state: "texas"},
    qualifying_reason: ["to provide national guard employees protections for drill and service"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 119,
    state: "texas",
    leave_name: "Witness Leave",
    eligibility: {state: "texas"},
    qualifying_reason: ["legal/court proceedings"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 120,
    state: "texas",
    leave_name: "Voting Leave",
    eligibility: {state: "texas"},
    qualifying_reason: ["voting"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  }, {
    _comment: 121,
    state: 'utah',
    leave_name: 'TX Military',
    eligibility: {state: 'utah'},
    qualifying_reason: [
      'military'
    ],
    leave_type: ['all'],
    maximum_duration: undefined
  },
  {
    _comment: 122,
    state: "utah",
    leave_name: "Testimony Leave",
    eligibility: {state: "utah"},
    qualifying_reason: ["legal/court proceedings"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 123,
    state: "utah",
    leave_name: "Voting Leave",
    eligibility: {state: "utah"},
    qualifying_reason: ["voting"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 124,
    state: "vermont",
    leave_name: "Crime Victim Leave",
    eligibility: {state: "vermont"},
    qualifying_reason: ["legal/court proceedings"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 125,
    state: "vermont",
    leave_name: "Parental and Family Leave Act",
    eligibility: {month: 12, week_hours: 30},
    qualifying_reason: ["school activities", "employees own health condition", "family members health condition", "care for newborn"],
    leave_type: ["all"],
    maximum_duration: {value: 84, granularityType: 'days'}
  },
  {
    _comment: 126,
    state: "virginia",
    leave_name: "Testimony Leave",
    eligibility: {state: "virginia"},
    qualifying_reason: ["legal/court proceedings"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 127,
    state: "viginia",
    leave_name: "Crime Victim Leave",
    eligibility: {state: "virginia"},
    qualifying_reason: ["for a victim of crime or the spouse or parent of a victim of crime to  attend criminal proceedings"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  },
  {
    _comment: 128,
    state: "virginia",
    leave_name: "Election Officer Leave",
    eligibility: {state: "virginia"},
    qualifying_reason: ["political proceedings"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  }, {
    _comment: 129,
    state: 'virginia',
    leave_name: 'VA Military',
    eligibility: {state: 'virginia'},
    qualifying_reason: [
      'military'
    ],
    leave_type: ['all'],
    maximum_duration: undefined
  }, {
    _comment: 130,
    state: 'washington',
    leave_name: 'Pregnancy Disability Leave',
    eligibility: {state: 'washington'},
    qualifying_reason: [
      'maternity'
    ],
    leave_type: ['all'],
    maximum_duration: undefined
  }, {
    _comment: 131,
    state: 'washington',
    leave_name: 'WA Family Leave Act (WA FLA)',
    eligibility: {month: 12, hours: 1250},
    qualifying_reason: [
      'employees own health condition',
      'family members health condition',
      'maternity',
      'adoption',
      'care for newborn'
    ],
    leave_type: ['all'],
    maximum_duration: {value: 84, granularityType: 'days'}
  }, {
    _comment: 132,
    state: 'washington',
    leave_name: 'Pregnancy Disability Leave',
    eligibility: {state: 'washington'},
    qualifying_reason: [
      'military'
    ],
    leave_type: ['all'],
    maximum_duration: {value: 48, granularityType: 'months'}
  }, {
    _comment: 133,
    state: 'washington',
    leave_name: 'Family Military Leave',
    eligibility: {
      state: 'washington'
    },
    qualifying_reason: [
      'family military exigency'
    ],
    leave_type: ['all'],
    maximum_duration: {value: 15, granularityType: 'days'}
  }, {
    _comment: 134,
    state: "washington",
    leave_name: "Domestic Violence Leave",
    eligibility: {state: "washington"},
    qualifying_reason: ["domestic violence"],
    leave_type: ["all"],
    maximum_duration: undefined
  },
  {
    _comment: 135,
    state: "washington",
    leave_name: "Emergency Services Leave",
    eligibility: {state: "washington"},
    qualifying_reason: ["emergency duty"],
    leave_type: ["intermittent"],
    maximum_duration: undefined
  }, {
    _comment: 136,
    state: 'company',
    leave_name: 'Company Medical',
    eligibility: {state: 'company'},
    qualifying_reason: [
      'employees own health condition',
      'maternity',
    ],
    leave_type: ['all'],
    maximum_duration: undefined
  }, {
    _comment: 137,
    state: 'company',
    leave_name: 'Military',
    eligibility: {state: 'company'},
    qualifying_reason: [
      'military'
    ],
    leave_type: ['all'],
    maximum_duration: undefined
  }];