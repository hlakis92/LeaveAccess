let windowLocation = window.location;
let userSignURL = windowLocation.origin + '/api/user/user-signin';
let addEmployeeURL = windowLocation.origin + '/api/employee/add-employee';
let dummyCallURL = windowLocation.origin + '/api/employee/dummy-call';

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
  // if (firstName == '' || lastName == '') {
  //   return false
  // } else {
  //   deleteCookie('employeeInfo');
  //   setCookie('employeeInfo', JSON.stringify(data), 1);
  //   window.location.href = windowLocation.origin + '/location';
  // }

  // alert('click')
  // redirectUri()
  // debugger;
  // window.href = windowLocation.origin + "/location";

  // var $form = $("#employeeForm");
  //
  // // check if the input is valid
  // if(! $form.valid()) return false;
  // console.log(data)
  $.ajax({
    type: 'POST',
    url: dummyCallURL,
    dataType: "json",
    data: data,
    beforeSend: function (xhr) {
      if (firstName == '' || lastName == '') {
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
      if ($("#inputEmployeeId").val() == '') {
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
  let radioValue= leaveReasonInfo['leaveReason'];
  let type = 1;
  if (radioValue === 'Employees Own Health Condition') {
    type = 0
  }
  window.location.href = windowLocation.origin + '/leaveprovider?type=' + type;
  // window.location.href = windowLocation.origin + '/leavereason';
});