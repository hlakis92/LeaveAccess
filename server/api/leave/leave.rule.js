let leaveConstant = require('./leave.constant');
let DateLibrary = require('date-management');
let d3 = require('d3');
let ruleList = leaveConstant.leaveMatrix;


/*
  this function is core part of the system
  here check all leave eligibility criteria state wise
*/
module.exports.checkLeaveEligibility = (data) => {
  let leaveMatch = 0;
  let leaveEligibleList = [];
  ruleList.forEach((ruleData, index) => {
    // this if is only for debug purpose, there no longer to use in system further
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
    // getting maximum duration of leave list
    if (ruleData['maximum_duration'] !== undefined) {
      // getting maximum duration of leave as per leave plan
      // here leave maximum duration in hours, days or week
      maxToDateForValidation =
        DateLibrary.getRelativeDate(new Date(data['from_date']),
          {
            operationType: "Absolute_DateTime",
            granularityType: ruleData['maximum_duration']['granularityType'],
            value: ruleData['maximum_duration']['value']
          });
    }

    // console.log(maxToDateForValidation);
    // checking leave matrix as per excel sheet
    if (
      (ruleData['state'] === data['locationState'] || ruleData['state']==='federal') &&
      ((data['type_of_leave'] === 'family members health condition' &&
        ruleData['qualifying_reason'].includes('to care for a family member') === true
        && data[ 'is_loco_parentis']=="true") ||
        (data['type_of_leave'] === 'school activities' &&
          ruleData['qualifying_reason'].includes('school activities') === true
          && data[ 'family_relation']=="Child") ||
        (ruleData['qualifying_reason'].includes(data['type_of_leave']) === true
          && ['school activities'].includes(data['type_of_leave']) === false)) &&
      ((data['type_of_leave'] == 'maternity' && data['gender'] == 1) ||
        (data['type_of_leave'] != 'maternity')) &&
      (ruleData['leave_type'].includes('all') === true
        || ruleData['leave_type'].includes(data['leave_type']) === true) &&
      (maxToDateForValidation === undefined
        || (new Date(maxToDateForValidation)).getTime() >= new Date(data['to_date']).getTime())
    ) {
      let eligible=1;
      let eligibleType='met';
      // only for leave no. 17
      if(data['leave_type'] === 'continuous' && ruleData['_comment'] === 17){
        eligible = 0;
        eligibleType='not met';
      }
      ruleData['eligible'] = eligible;
      ruleData['eligibilityData'] = [];
      ruleData['eligibilityData'].push({
        'text': 'Specific Reason',
        'value': eligibleType
      });
      // checking  Override eligibility criteria and prepare met not met list
      if (ruleData['eligibility'].hasOwnProperty('state') === true
        && ruleData['eligibility']['state'] == data['locationState']) {

        if (ruleData['eligibility'].hasOwnProperty('hours') === false ||
          ruleData['eligibility'].hasOwnProperty('month') === false)
          ruleData['eligibilityData'].push({
            'text': 'Override Eligibility',
            'value': eligibleType
          });
        // ruleData['eligibility']['state'] = 'met';
      }
      // checking Hours in Past 12 Month eligibility criteria and prepare met not met list
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
      // checking Months of Service eligibility criteria and prepare met not met list
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
      // ruleData['from_date_format'] = d3.time.format("%m/%d/%Y")(new Date(ruleData['from_date']));
      // ruleData['to_date_format'] = d3.time.format("%m/%d/%Y")(new Date(ruleData['to_date']));
      leaveEligibleList.push(ruleData);
      console.log("pass..................", ruleData);
      leaveMatch++;
    }
  });
  return leaveEligibleList;
};

