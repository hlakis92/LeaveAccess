let leaveConstant = require('./leave.constant');
let DateLibrary = require('date-management');
let ruleList = leaveConstant.leaveMatrix;

module.exports.checkLeaveEligibilty = (data) => {
  let leaveMatch = 0;
  let leaveElibleList = [];
  ruleList.forEach((ruleData, index) => {
    if (ruleData['state'] === data['locationState']) {
      console.log('......', ruleData['_comment'])
      console.log(ruleData['qualifying_reason'].includes(data['type_of_leave']), ruleData['qualifying_reason'], (data['type_of_leave']));
      console.log(ruleData['state'] === data['locationState'], ruleData['state'], data['locationState']);
      console.log(ruleData['leave_type'].includes('all'), ruleData['leave_type']);
      console.log(ruleData['maximum_duration'] !== undefined);
      // console.log(ruleData['eligibility']['hours'] , data['last_12_month_work_hours']);
      //   console.log(ruleData['eligibility']['month'] <= data['service_period_in_month']);
    }

    let maxToDateForValidation;
    if (ruleData['maximum_duration'] !== undefined) {
      maxToDateForValidation =
        DateLibrary.getRelativeDate(new Date(data['from_date']),
          {
            operationType: "Absolute_DateTime",
            granularityType: ruleData['maximum_duration']['granularityType'],
            value: ruleData['maximum_duration']['value']
          });
    }

    // console.log(maxToDateForValidation);
    if (ruleData['state'] === data['locationState'] &&
      ruleData['qualifying_reason'].includes(data['type_of_leave']) === true &&
      (ruleData['leave_type'].includes('all') === true
        || ruleData['leave_type'].includes(data['leave_type']) === true) &&
      (maxToDateForValidation === undefined
        || (new Date(maxToDateForValidation)).getTime() >= new Date(data['to_date']).getTime())
    ) {
      ruleData['eligible'] = 1;
      ruleData['eligibilityData'] = [];
      ruleData['eligibilityData'].push({
        'text': 'Specific Reason',
        'value': 'met'
      });
      if (ruleData['eligibility'].hasOwnProperty('state') === true
        && ruleData['eligibility']['state'] == data['locationState']) {

        if (ruleData['eligibility'].hasOwnProperty('hours') === false ||
          ruleData['eligibility'].hasOwnProperty('month') === false)
          ruleData['eligibilityData'].push({
            'text': 'Override Eligibility',
            'value': 'met'
          });
        // ruleData['eligibility']['state'] = 'met';
      }
      if (ruleData['eligibility'].hasOwnProperty('hours') === true) {
        if (ruleData['eligibility']['hours'] <= data['last_12_month_work_hours']) {

          ruleData['eligibilityData'].push({
            'text': ruleData['eligibility']['hours'] + ' Hours in Past 12 Month',
            'value': 'met'
          });
          // ruleData['eligibility']['hours'] = 'met';
        } else {
          ruleData['eligibilityData'].push({
            'text': ruleData['eligibility']['hours'] + ' Hours in Past 12 Month',
            'value': 'not met'
          });
          if (ruleData['eligible'] === 1) {
            ruleData['eligible'] = 0;
          }
        }
      }
      if (ruleData['eligibility'].hasOwnProperty('month') === true) {
        if (ruleData['eligibility']['month'] <= data['service_period_in_month']) {

          ruleData['eligibilityData'].push({
            'text': ruleData['eligibility']['month'] + ' Months of Service',
            'value': 'met'
          });
          // ruleData['eligibility']['month'] = 'met';
        } else {
          ruleData['eligibilityData'].push({
            'text': ruleData['eligibility']['month'] + ' Months of Service',
            'value': 'not met'
          });
          if (ruleData['eligible'] === 1) {
            ruleData['eligible'] = 0;
          }
        }
      }
      ruleData['from_date'] = data['from_date'];
      ruleData['to_date'] = data['to_date'];
      leaveElibleList.push(ruleData);
      console.log("pass..................", ruleData);
      leaveMatch++;
    }
  });
  return leaveElibleList;
};

/*
let qulityResonList = [
  "employees own health condition",
  "family members health condition",
  "workplace accommodation",
  "maternity",
  "care for newborn",
  "adoption",
  "foster care",
  "military",
  "military duty",
  "family military exigency",
  "emergency duty",
  "marrow/organ/blood donation",
  "political proceedings",
  "domestic violence",
  "school activities",
  "legal/court proceedings",
  "jury duty",
  "voting",
];

ruleList.forEach((data,index)=>{
  // console.log((index+1),data['_comment'])
  data['qualifying_reason'].forEach(qr=>{
    if(qulityResonList.includes(qr)===false){
      console.log(data['_comment'],qr);
    }
  });
})*/
