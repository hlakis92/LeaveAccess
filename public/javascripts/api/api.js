let windowLocation = window.location;
let userSignURL = windowLocation.origin + '/api/user/user-signin';
let logoutURL = windowLocation.origin + '/api/user/logout';
let addEmployeeURL = windowLocation.origin + '/api/employee/add-employee';
let syncDataURL = windowLocation.origin + '/api/leave/sync-data';
let checkLeaveEligibility = windowLocation.origin + '/api/leave/check-leave-eligibility';
let submitLeaveURL = windowLocation.origin + '/api/leave/add-all-data';
let getAllEmployeeLeaveURL = windowLocation.origin + '/api/leave/get-employee-leave';
let getAllEmployeeURL = windowLocation.origin + '/api/employee/get-all-employee';
let getEmployeeLeaveSummaryURL = windowLocation.origin + '/api/leave/get-employee-leave-summary';
let editLeaveDecisionURL = windowLocation.origin + '/api/leave/edit-leave-decision';
let addLeaveDeterminationDecisionURL = windowLocation.origin + '/api/leave/add-leave-determination-decision';
let returnToWorkConfirmationURL = windowLocation.origin + '/api/leave/return-to-work-confirmation';
let paperWorkReviewURL = windowLocation.origin + '/api/leave/paper-work-review';
let intermittentParameterURL = windowLocation.origin + '/api/leave/intermittent-parameter';
let intermittentTimeURL = windowLocation.origin + '/api/leave/intermittent-time';
let getIntermittentTimeURL = windowLocation.origin + '/api/leave/get-intermittent-time';
let uploadMediaURL = windowLocation.origin + '/api/media/upload';


let getUsersURL = windowLocation.origin + '/api/user';

let getTaskURL = windowLocation.origin + '/api/task';

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
      xhr.setRequestHeader('udid', getUDID());
      xhr.setRequestHeader('token', getToken());
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
      if (result.status === true) {
        debugger;
        setCookie('token', result['access_token'], 1);
        $.cookie('token', result['access_token']);
        $.cookie('udid', getUDID());
        $("#messageSuccess").text(result.data.message);
        window.location.href = 'searchemployee';
      } else {
        let errorHtml = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
          result.error.message +
          '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
          '<span aria-hidden="true">&times;</span>' +
          '</button>' +
          '</div>';
        $("#messageError").html(errorHtml);
      }
    },
    error: function (result) {
      console.log("error..............")
    }
  });
});

$('#logoutButton').on('click', function (e) {
  $.ajax({
    type: 'POST',
    url: logoutURL,
    dataType: "json",
    beforeSend: function (xhr) {
      xhr.setRequestHeader('udid', getUDID());
      xhr.setRequestHeader('token', getToken());
    },
    success: function (result) {
      if (result.status === true) {
        deleteCookie('udid');
        deleteCookie('token');
        $.removeCookie('udid');
        $.removeCookie('token');
        window.location.href = '/';
      } else {

      }
    },
    error: function (result) {
      console.log("error..............")
    }
  });
});

$('#employeeAddButton').on('click', function (e) {
  // e.preventDefault();
  empId = $("#inputEmpId").val();
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
    empId: empId,
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
    url: syncDataURL,
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
      if (empId > 0) {
        window.location.href = windowLocation.origin + '/location?empId=' + empId;
      } else {
        window.location.href = windowLocation.origin + '/location';
      }
    },
    error: result => {
      console.log(result)
    }
  });
});

$('#locationAddButton').one('click', function (e) {
  let data = {
    empId: $("#inputEmpId").val(),
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
    hrName: $("#hrName").val(),
    hrEmail: $("#hrEmail").val(),
    payrollPhone: $("#payrollPhone").val(),
    payrollName: $("#payrollName").val(),
    payrollEmail: $("#payrollEmail").val(),
    inputsundayRSHours: $("#inputsundayRSHours").val() || 0,
    inputmondayRSHours: $("#inputmondayRSHours").val() || 0,
    inputtuesdayRSHours: $("#inputtuesdayRSHours").val() || 0,
    inputwednesdayRSHours: $("#inputwednesdayRSHours").val() || 0,
    inputthursdayRSHours: $("#inputthursdayRSHours").val() || 0,
    inputfridayRSHours: $("#inputfridayRSHours").val() || 0,
    inputsaturdayRSHours: $("#inputsaturdayRSHours").val() || 0,
  };
  $.ajax({
    type: 'POST',
    url: syncDataURL + "?page=location",
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
      if (result.status === false) {
        $("#errMsg").html(result.error.message);
      } else {
        deleteCookie('locationInfo');
        setCookie('locationInfo', JSON.stringify(data), 1);
        window.location.href = windowLocation.origin + '/leavereason';
      }

    },
    error: result => {
      console.log(result)
    }
  });
});

$('#leaveReasonAddButton').on('click', function (e) {
  let radioValue = $("input[name='gridRadios']:checked").val();
  let data = {
    leaveReason: radioValue,
  };
  $.ajax({
    type: 'POST',
    url: syncDataURL,
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
      if (radioValue === 'Emergency Duty') {
        window.location.href = windowLocation.origin + '/leavetype';
      } else {
        window.location.href = windowLocation.origin + '/leaveprovider?type=' + type;
      }
    },
    error: result => {
      console.log(result)
    }
  });
});

$('#leaveProviderAddButton').on('click', function (e) {
  let type = (getQueryStringValue("type"));
  let data = {
    familyFirst: $("#inputFirst4").val() || "",
    familyLast: $("#inputLast4").val() || "",
    familyMemberDOB: $("#inputFamilyMemberDOB4").val() || "",
    familyRelation: $("#inputRelation").val() || "",
    inLocoParent: $("#gridCheck").prop('checked'),
    providerName: $("#providerName").val(),
    providerType: $("#providerType").val(),
    providePhone: $("#providePhone").val(),
    provideFax: $("#provideFax").val(),
    provideAddress: $("#provideAddress").val(),
  };
  $.ajax({
    type: 'POST',
    url: syncDataURL,
    dataType: "json",
    data: data,
    beforeSend: function (xhr) {
      if (
        (type == 1 &&
          $("#inputFirst4").val() == '' ||
          $("#inputLast4").val() == '' || $("#inputFamilyMemberDOB4").val() == '' ||
          $("#inputRelation").val() == ''
        )) {
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
    url: syncDataURL,
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
    gender: employeeInfo['gender'],
    locationState: (locationInfo['state']).toLowerCase(),
    last_12_month_work_hours: (locationInfo['_12MonthHours']),
    is_loco_parentis: leaveProviderInfo['inLocoParent'],
    family_relation: leaveProviderInfo['familyRelation'],
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
  console.log("........................");
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
  // console.log(requireData)
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
      if (result.status === true) {
        let redirectURL = "claim" + result.data.leave_type + "\\" + result.data.leave_id;
        window.location.href = windowLocation.origin + '/' + redirectURL;
      }
    },
    error: result => {
      console.log(result)
    }
  });
});

/*$('#leaveDecisionButton').on('click', function (e) {
  let leaveInfoId = $("#leaveInfoId").val();
  let leaveTypeStatus = $("#selectLeaveTypeOptions").val();
  let leaveType = $("#leaveType").val();
  let startDate = $("#fromDate").val();
  let endDate = $("#toDate").val();
  let empId = $("#empId").val();
  let requireData = {
    leaveInfoId: leaveInfoId,
    leaveTypeStatus: leaveTypeStatus,
    empId: empId,
    startDate: startDate,
    endDate: endDate
  };
  $.ajax({
    type: 'POST',
    url: addLeaveDeterminationDecisionURL,
    dataType: "json",
    data: requireData,
    success: result => {
      window.location.href = windowLocation.origin + '/decision/' + leaveInfoId;
    },
    error: result => {
      console.log(result)
    }
  });
});*/

$('#leaveDecisionSubmitButton').on('click', function (e) {
  let leaveInfoId = $("#leaveInfoId").val();
  let leaveTypeStatus = $("#selectLeaveTypeOptions").val();
  let leaveType = $("#leaveType").val();
  let startDate = $("#fromDate").val();
  let endDate = $("#toDate").val();
  let empId = $("#empId").val();
  let requireData = {
    leaveInfoId: leaveInfoId,
    leaveTypeStatus: leaveTypeStatus,
    empId: empId,
    startDate: startDate,
    endDate: endDate
  };
  $.ajax({
    type: 'POST',
    url: addLeaveDeterminationDecisionURL,
    dataType: "json",
    data: requireData,
    success: result => {
      window.location.href = windowLocation.origin + '/claim' + leaveType + '/' + leaveInfoId;
    },
    error: result => {
      console.log(result)
    }
  });
});

$('#locationBackButton').on('click', function (e) {
  window.location.href = windowLocation.origin + '/employee';
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
  if (radioValue === 'Emergency Duty') {
    window.location.href = windowLocation.origin + '/leavereason';
  } else {
    window.location.href = windowLocation.origin + '/leaveprovider?type=' + type;
  }
  // window.location.href = windowLocation.origin + '/leavereason';
});

$('#leaveEligibilityBackButton').on('click', function (e) {
  // alert('click');
  window.location.href = windowLocation.origin + '/leavetype';
});


$('#ERTWModelButton').on('click', function (e) {
  let data = {
    type: 'ERTW',
    ERTWDate: $("#ERTWDate").val(),
    ERTW_userId: $("#managersERTWId").val(),
    leaveInfoId: $("#leaveInfoId").val(),
  };
  $.ajax({
    type: 'POST',
    url: returnToWorkConfirmationURL,
    dataType: "json",
    data: data,
    beforeSend: function (xhr) {
      if ($("#ERTWDate").val() == '' || $("#managersERTWId").val() == '') {
        return false
      } else {
        e.preventDefault();
        $("#ERTWModelClose").trigger("click");
        $("#ERTWDateDisplayDate").html(getDateInUSFormat($("#ERTWDate").val()))
      }
    },
    success: result => {
      console.log(result);
      alert_message(result.data.message, "success");
    },
    error: result => {
      console.log(result)
    }
  });
});

$('#ARTWModelButton').on('click', function (e) {
  let data = {
    type: 'ARTW',
    ARTWDate: $("#ARTWDate").val(),
    ARTW_userId: $("#managersARTWId").val(),
    leaveInfoId: $("#leaveInfoId").val(),
  };
  $.ajax({
    type: 'POST',
    url: returnToWorkConfirmationURL,
    dataType: "json",
    data: data,
    beforeSend: function (xhr) {
      if ($("#ARTWDate").val() == '' || $("#managersARTWId").val() == '') {
        return false
      } else {
        e.preventDefault();
        $("#ARTWModelClose").trigger("click");
        $("#ARTWDateDisplayDate").html(getDateInUSFormat($("#ARTWDate").val()))
      }
    },
    success: result => {
      console.log(result);
      alert_message(result.data.message, "success");
    },
    error: result => {
      console.log(result)
    }
  });
});

$('#intermittentParameterButton').on('click', function (e) {
  let data = {
    flareUpsParams: $("#flareUpsParams").val(),
    officeVisitsParams: $("#officeVisitsParams").val(),
    leaveInfoId: $("#leaveInfoId").val(),
  };
  $.ajax({
    type: 'POST',
    url: intermittentParameterURL,
    dataType: "json",
    data: data,
    beforeSend: function (xhr) {
      if ($("#flareUpsParams").val() == '' || $("#officeVisitsParams").val() == '') {
        return false
      } else {
        e.preventDefault();
        $("#intermittentParameterModelClose").trigger("click");
      }
    },
    success: result => {
      console.log(result);
      alert_message(result.data.message, "success");
    },
    error: result => {
      console.log(result)
    }
  });
});

$('#intermittentTimeSubmitButton').on('click', function (e) {
  let data = {
    leaveInfoId: $("#leaveInfoId").val(),
    param: $("#intermittentParam").val(),
    date: $("#datePick").val(),
    hours: $("#hoursUsed").val(),
    status: $("#statusSelect").val(),
    comment: $("#commentText").val() || "",
  };
  $.ajax({
    type: 'POST',
    url: intermittentTimeURL,
    dataType: "json",
    data: data,
    beforeSend: function (xhr) {
      if ($("#datePick").val() == "") {
        return false
      } else {
        e.preventDefault();
        $("#intermittentTimeModal").trigger("click");
      }
    },
    success: result => {
      console.log(result);
      alert_message(result.data.message, "success");
    },
    error: result => {
      console.log(result)
    }
  });
});

$('#paperWorkReviewButton').on('click', function (e) {
  let paperWorkDataSelected = [];
  let paperWorkDataUnSelected = [];
  $.each($("input[name='paperWork']"), function () {
    if (this.checked) {
      paperWorkDataSelected.push($(this).val());
    } else {
      paperWorkDataUnSelected.push($(this).val());
    }

  });
  let data = {
    leaveInfoId: $("#leaveInfoId").val(),
    paperWorkDataSelected: (paperWorkDataSelected).toString(),
    paperWorkDataUnSelected: paperWorkDataUnSelected.toString(),
  };
  console.log(data)
  $.ajax({
    type: 'POST',
    url: paperWorkReviewURL,
    dataType: "json",
    data: data,
    beforeSend: function (xhr) {
      $("#paperWorkModelClose").trigger("click");
    },
    success: result => {
      console.log(result);
      alert_message(result.data.message, "success");
    },
    error: result => {
      console.log(result)
    }
  });
});

function getQueryStringValue(key) {
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}


// media
let mediaFiles;
$('#uploadPaperWorkFile').on('change', getFileName);

function getFileName(event) {
  mediaFiles = event.target.files;
  // debugger;
}

$('#UploadPaperWorkDocument').on('click', uploadMedia);

function uploadMedia(event) {
  if (mediaFiles != undefined && mediaFiles.length > 0) {
    $('.loaderdiv').show();
    var mediaData = new FormData();
    mediaData.append("file", mediaFiles[0]);
    mediaData.append("leave_info_id", $("#leaveInfoId").val());
    mediaData.append("emp_id", $("#empId").val());
    mediaFiles = undefined;
    let requestMedia = $.ajax({
      url: uploadMediaURL,
      type: "POST",
      data: mediaData,
      dataType: "json",
      cache: false,
      processData: false,
      contentType: false,
    });
    requestMedia.done(function (data) {
      if (data.status) {
        $('.loaderdiv').hide();
        $("#documentList").append('<div class="form-group col-md-12"><a href=' + data.data.url + '>' + data.data.text + '</a></div>');
        alert_message("Document has been uploaded successfully.", "success");
      }
    });
    requestMedia.fail(function (jqXHR, textStatus) {
      alert_message(textStatus, "fail");
    });
  }
}

function getIntermittentTime() {
  let leaveInfoId = $("#leaveInfoId").val();
  let date = $("#selectedDate").val();
  $.ajax({
    type: 'GET',
    url: getIntermittentTimeURL + "/" + leaveInfoId + "/" + date,
    dataType: "json",
    success: result => {
      console.log(result);
      if (result.status === true) {
        $("#intermittentParam").val(result.data.param);
        $("#datePick").val(result.data.date);
        $("#hoursUsed").val(result.data.hours);
        $("#statusSelect").val(result.data.status);
        $("#commentText").text(result.data.comment);
      } else {
        $("#intermittentParam").val("flareUp");
        $("#datePick").val("");
        $("#hoursUsed").val(0);
        $("#statusSelect").val("pendingIntTime");
        $("#commentText").text("");
      }

      // alert_message(result.data.message, "success");
    },
    error: result => {
      console.log(result)
    }
  });
}


