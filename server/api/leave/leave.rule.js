let leaveConstant = require('./leave.constant');
let DateLibrary = require('date-management');
let ruleList = leaveConstant.leaveMatrix;

module.exports.checkLeaveEligibilty = (data) => {
  let leaveMatch = 0;
  let leaveElibleList = [];
  ruleList.forEach((ruleData,index) => {
    // if(index===0){
    //   console.log(ruleData['qualifying_reason'].includes(data['type_of_leave']));
      console.log(ruleData['eligibility']['hours'] , data['last_12_month_work_hours']);
    //   console.log(ruleData['eligibility']['month'] <= data['service_period_in_month']);
    // }

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
      (maxToDateForValidation !== undefined
        || (new Date(maxToDateForValidation)).getTime() >= new Date(data['to_date']).getTime())
    ) {
      if(ruleData['eligibility'].hasOwnProperty('state') === true
        && ruleData['eligibility']['state'] == data['locationState']){
        ruleData['eligibility']['state'] = 'met';
      }
      if(ruleData['eligibility'].hasOwnProperty('hours') === true
          && ruleData['eligibility']['hours'] <= data['last_12_month_work_hours']){
        ruleData['eligibility']['hours'] = 'met';
      }
      if(ruleData['eligibility'].hasOwnProperty('month') === true
        && ruleData['eligibility']['month'] <= data['service_period_in_month']){
        ruleData['eligibility']['month'] = 'met'
      }
      ruleData['from_date']=data['from_date'];
      ruleData['to_date']=data['to_date'];
      leaveElibleList.push(ruleData);
      console.log("pass..................", ruleData);
      leaveMatch++;
    }
  });
  return leaveElibleList;
};