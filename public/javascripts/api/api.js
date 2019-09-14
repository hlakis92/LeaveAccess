let windowLocation = window.location;
let userSignURL = windowLocation.origin + '/api/user/user-signin';
let addEmployeeURL = windowLocation.origin + '/api/employee/add-employee';
let dummyCallURL = windowLocation.origin + '/api/employee/dummy-call';
let checkLeaveEligibility = windowLocation.origin + '/api/leave/check-leave-eligibility';
let submitLeaveURL = windowLocation.origin + '/api/leave/add-all-data';
let getAllEmployeeLeaveURL = windowLocation.origin + '/api/leave/get-employee-leave';

$('#signinButton').on('click', function (e) {
  e.preventDefault();
  // var validationItem = $("#contactUsFormSponsor .invalid");
  let email = $("#inputEmail").val();
  let password = $("#inputPassword").val();
  let data = {
    "email": $("#inputEmail").val(),
    "password": $("#inputPassword").val(),
  };
  console.log('click.......')

  let errorHtml = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
    '{{message}}' +
    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
    '<span aria-hidden="true">&times;</span>' +
    '</button>' +
    '</div>'

  $.ajax({
    type: 'POST',
    url: userSignURL,
    dataType: "json",
    data: data,
    beforeSend: function (xhr) {
      // let email = $("#inputEmail").val()
      // alert(email)
      if (email.length === 0 && password.length === 0) {
        let message = "Please enter email and password!";
        $("#messageError").html(errorHtml.replace('{{message}}', message));
        return false;
      }
      if (email.length === 0) {
        let message = "Please enter email!";
        $("#messageError").html(errorHtml.replace('{{message}}', message));
        return false;
      }
      if (password.length === 0) {
        let message = "Please enter password!";
        $("#messageError").html(errorHtml.replace('{{message}}', message));
        return false;
      }
      // xhr.setRequestHeader('api-key', apiKey); //For Local
      // xhr.setRequestHeader('udid', getUDID());
      // xhr.setRequestHeader('device-type', getDeviceType());

      // $('#loginForm :input:visible[required="required"]').each(function()
      // {
      //   if(!this.validity.valid)
      //   {
      //     $(this).focus();
      //     // break
      //     return false;
      //   }
      // });
    },
    success: function (result) {
      // $("#inputEmail").val("");
      // $("#inputPassword").val("");
      // console.log("success...........", result)
      if (result.status === true) {
        $("#messageSuccess").text(result.data.message);
        window.location.href = 'dashboard';
      } else {
        let errorHtml = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
          result.error.message +
          '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
          '<span aria-hidden="true">&times;</span>' +
          '</button>' +
          '</div>'
        $("#messageError").html(errorHtml);
      }
      // $("#comment").val("");
      // $('#thank-you-contactus-dialog').modal('show');
      // setTimeout(function () {
      //   $('#thank-you-contactus-dialog').modal('hide');
      // }, 10000);
    },
    error: function (result) {
      console.log("error..............")
      // $('#contact-us-dialog').modal('hide');
      // $("#name").val("");
      // $("#mobile").val("");
      // $("#comment").val("");
    }
  });
});

$('#employeeAddButton').on('click', function (e) {
  // e.preventDefault();
  firstName = $("#inputFirstName").val();
  lastName = $("#inputLastName").val();
  email = $("#inputEmail").val();
  DOB = $("#inputDOB").val();
  gender = $("#inputGender").val();
  address1 = $("#inputAddress1").val();
  address2 = $("#inputAddress2").val();
  city = $("#inputCity").val();
  state = $("#inputState").val();
  pincode = $("#inputZip").val();
  let data = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    DOB: DOB,
    gender: gender,
    address1: address1,
    address2: address2,
    city: city,
    state: state,
    pincode: pincode,
  };

  $.ajax({
    type: 'POST',
    url: dummyCallURL,
    dataType: "json",
    data: data,
    beforeSend: function (xhr) {
      if (firstName == '' || lastName == '' || email == '' || DOB == ''
        || address1 == '' || city == '' || state == '' || pincode == '') {
        return false
      } else {
        e.preventDefault();
      }
    },
    success: result => {
      console.log(result);
      deleteCookie('employeeInfo');
      setCookie('employeeInfo', JSON.stringify(data), 1);
      window.location.href = windowLocation.origin + '/location';
    },
    error: result => {
      console.log(result)
    }
  });
});

$('#locationAddButton').on('click', function (e) {
  let data = {
    employeeId: $("#inputEmployeeId").val(),
    employeeStatus: $("#inputEmployeeStatus").val(),
    locationEmail: $("#inputLocationEmail").val(),
    DOJ: $("#inputHireDate").val(),
    _12MonthHours: $("#input12MonthHours").val(),
    address: $("#inputAddress").val(),
    city: $("#inputCity").val(),
    state: $("#inputState").val(),
    pincode: $("#inputZip").val(),
    supervisorPhone: $("#supervisorPhone").val(),
    supervisorName: $("#supervisorName").val(),
    supervisorEmail: $("#supervisorEmail").val(),
    hrPhone: $("#hrPhone").val(),
    hrPhoneName: $("#hrPhoneName").val(),
    hrEmail: $("#hrEmail").val(),
    payrollPhone: $("#payrollPhone").val(),
    payrollName: $("#payrollName").val(),
    payrollEmail: $("#payrollEmail").val(),
    inputsundayRSHours: $("#inputsundayRSHours").val(),
    inputmondayRSHours: $("#inputmondayRSHours").val(),
    inputtuesdayRSHours: $("#inputtuesdayRSHours").val(),
    inputwednesdayRSHours: $("#inputwednesdayRSHours").val(),
    inputthursdayRSHours: $("#inputthursdayRSHours").val(),
    inputfridayRSHours: $("#inputfridayRSHours").val(),
    inputSaturdayRSHours: $("#inputSaturdayRSHours").val(),
  };
  $.ajax({
    type: 'POST',
    url: dummyCallURL,
    dataType: "json",
    data: data,
    beforeSend: function (xhr) {
      if ($("#inputEmployeeId").val() == '' || $("#employeeStatus").val() == '' ||
        $("#inputLocationEmail").val() == '' || $("#inputHireDate").val() == '' ||
        $("#input12MonthHours").val() == '' || $("#inputAddress").val() == '' ||
        $("#inputCity").val() == '' || $("#inputState").val() == '' || $("#inputZip").val() == '') {
        return false
      } else {
        e.preventDefault();
      }
    },
    success: result => {
      console.log(result);
      deleteCookie('locationInfo');
      setCookie('locationInfo', JSON.stringify(data), 1);
      window.location.href = windowLocation.origin + '/leavereason';
    },
    error: result => {
      console.log(result)
    }
  });
});

$('#leaveReasonAddButton').on('click', function (e) {
  let radioValue = $("input[name='gridRadios']:checked").val();
  console.log(radioValue)
  // debugger;
  // alert(radioValue)
  let data = {
    leaveReason: radioValue,
  };

  $.ajax({
    type: 'POST',
    url: dummyCallURL,
    dataType: "json",
    data: data,
    beforeSend: function (xhr) {
      if (radioValue == undefined) {
        return false
      } else {
        e.preventDefault();
      }
    },
    success: result => {
      console.log(result);
      deleteCookie('leaveReasonInfo');
      setCookie('leaveReasonInfo', JSON.stringify(data), 1);
      let type = 1;
      if (radioValue === 'Employees Own Health Condition') {
        type = 0
      }
      window.location.href = windowLocation.origin + '/leaveprovider?type=' + type;
    },
    error: result => {
      console.log(result)
    }
  });
});

$('#leaveProviderAddButton').on('click', function (e) {
  let type = (getQueryStringValue("type"));
  let data = {
    familyFirst: $("#inputFirst4").val(),
    familyLast: $("#inputLast4").val(),
    familyMemberDOB: $("#inputFamilyMemberDOB4").val(),
    familyRelation: $("#inputRelation").val(),
    inLocoParent: $("#gridCheck").val(),
    providerName: $("#providerName").val(),
    providerType: $("#providerType").val(),
    providePhone: $("#providePhone").val(),
    provideFax: $("#provideFax").val(),
    provideAddress: $("#provideAddress").val(),
  };
  $.ajax({
    type: 'POST',
    url: dummyCallURL,
    dataType: "json",
    data: data,
    beforeSend: function (xhr) {
      if ((type == 0 && ($("#providerName").val() == '' || $("#providerType").val() == '' ||
        $("#providePhone").val() == '' || $("#provideFax").val() == '' ||
        $("#provideAddress").val() == '') ||
        (type == 1 &&
          ($("#providerName").val() == '' || $("#providerType").val() == '' ||
          $("#providePhone").val() == '' || $("#provideFax").val() == '' ||
          $("#provideAddress").val() == '' || $("#inputFirst4").val() == '' ||
          $("#inputLast4").val() == '' || $("#inputFamilyMemberDOB4").val() == '' ||
            $("#inputRelation").val() == ''
          )))) {
        return false
      } else {
        e.preventDefault();
      }
    },
    success: result => {
      console.log(result);
      deleteCookie('leaveProviderInfo');
      setCookie('leaveProviderInfo', JSON.stringify(data), 1);
      window.location.href = windowLocation.origin + '/leavetype';
    },
    error: result => {
      console.log(result)
    }
  });
});

/*$('#leaveTypeAddButton').on('click', function (e) {
  let data = {
    startDate: $("#InputStartDateofTM1").val(),
    endDate: $("#InputEndDateofTM1").val(),
    leaveType: $("#selectLeaveTypeOptions").val(),
  };
  console.log(data);
  $.ajax({
    type: 'POST',
    url: dummyCallURL,
    dataType: "json",
    data: data,
    beforeSend: function (xhr) {
      if ($("#InputStartDateofTM1").val() == '' || $("#InputEndDateofTM1").val() == '' || $("#selectLeaveTypeOptions").val() == '') {
        return false
      } else {
        e.preventDefault();
      }
    },
    success: result => {
      console.log(result);
      deleteCookie('leaveTypeInfo');
      setCookie('leaveTypeInfo', JSON.stringify(data), 1);
      // window.location.href = windowLocation.origin + '/leavetype';
    },
    error: result => {
      console.log(result)
    }
  });
});*/

$('#leaveTypeAddButtonNext').on('click', function (e) {

  let data = {
    startDate: $("#InputStartDateofTM1").val(),
    endDate: $("#InputEndDateofTM1").val(),
    leaveType: $("#selectLeaveTypeOptions").val(),
  };
  let employeeInfo = getCookie('employeeInfo');
  let locationInfo = getCookie('locationInfo');
  let leaveReasonInfo = getCookie('leaveReasonInfo');
  let leaveProviderInfo = getCookie('leaveProviderInfo');
  employeeInfo = JSON.parse(employeeInfo);
  locationInfo = JSON.parse(locationInfo);
  leaveReasonInfo = JSON.parse(leaveReasonInfo);
  leaveProviderInfo = JSON.parse(leaveProviderInfo);
  let requireData = {
    locationState: (locationInfo['state']).toLowerCase(),
    last_12_month_work_hours: (locationInfo['_12MonthHours']),
    doj: (locationInfo['DOJ']),
    leave_type: (data['leaveType']).toLowerCase(),
    from_date: (data['startDate']).toLowerCase(),
    to_date: (data['endDate']).toLowerCase(),
    type_of_leave: (leaveReasonInfo['leaveReason']).toLowerCase(),
  };
  $.ajax({
    type: 'POST',
    url: checkLeaveEligibility,
    dataType: "json",
    data: requireData,
    beforeSend: function (xhr) {
      if ($("#InputStartDateofTM1").val() == '' || $("#InputEndDateofTM1").val() == '' || $("#selectLeaveTypeOptions").val() == '') {
        return false
      } else {
        e.preventDefault();
      }
    },
    success: result => {
      console.log(result);
      deleteCookie('leaveTypeInfo');
      setCookie('leaveTypeInfo', JSON.stringify(data), 1);
      deleteCookie('leaveEligibilityList');
      setCookie('leaveEligibilityList', JSON.stringify(result.data), 1);
      window.location.href = windowLocation.origin + '/leaveeligibility';
    },
    error: result => {
      console.log(result)
    }
  });
});

function cloneObject(Object) {
  return JSON.parse(JSON.stringify(Object));
};

$('#leaveSubmit').on('click', function (e) {
  let employeeInfo = getCookie('employeeInfo');
  let locationInfo = getCookie('locationInfo');
  let leaveReasonInfo = getCookie('leaveReasonInfo');
  let leaveProviderInfo = getCookie('leaveProviderInfo');
  let leaveTypeInfo = getCookie('leaveTypeInfo');
  let leaveEligibilityList = getCookie('leaveEligibilityList');
  let requireData = {
    employeeInfo: employeeInfo,
    locationInfo: locationInfo,
    leaveReasonInfo: leaveReasonInfo,
    leaveProviderInfo: leaveProviderInfo,
    leaveTypeInfo: leaveTypeInfo,
    leaveEligibilityList: leaveEligibilityList

  };
  // requireData=JSON.parse(requireData)
  console.log(requireData)
  $.ajax({
    type: 'POST',
    url: submitLeaveURL,
    dataType: "json",
    data: requireData,
    success: result => {
      console.log(result);
      deleteCookie('employeeInfo');
      deleteCookie('locationInfo');
      deleteCookie('leaveReasonInfo');
      deleteCookie('leaveProviderInfo');
      deleteCookie('leaveTypeInfo');
      deleteCookie('leaveEligibilityList');
      window.location.href = windowLocation.origin + '/searchleave';
    },
    error: result => {
      console.log(result)
    }
  });
});


$('#locationBackButton').on('click', function (e) {
  window.location.href = windowLocation.origin + '/dashboard';
});

$('#leaveReasonBackButton').on('click', function (e) {
  window.location.href = windowLocation.origin + '/location';
});

$('#leaveProviderBackButton').on('click', function (e) {
  // alert('click');
  window.location.href = windowLocation.origin + '/leavereason';
});

$('#leaveTypeBackButton').on('click', function (e) {
  let leaveReasonInfo = getCookie('leaveReasonInfo');
  leaveReasonInfo = JSON.parse(leaveReasonInfo);
  let radioValue = leaveReasonInfo['leaveReason'];
  let type = 1;
  if (radioValue === 'Employees Own Health Condition') {
    type = 0
  }
  window.location.href = windowLocation.origin + '/leaveprovider?type=' + type;
  // window.location.href = windowLocation.origin + '/leavereason';
});

$('#leaveEligibilityBackButton').on('click', function (e) {
  // alert('click');
  window.location.href = windowLocation.origin + '/leavetype';
});


function getQueryStringValue(key) {
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}


