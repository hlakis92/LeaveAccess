let windowLocation = window.location;

let userSignURL = windowLocation.origin + '/api/user/user-signin';

$('#signinButton').on('click', function (e) {
  console.log('click')
  e.preventDefault();
  // var validationItem = $("#contactUsFormSponsor .invalid");
  let data = {
    "email": $("#inputEmail").val(),
    "password": $("#inputPassword").val(),
  };
  console.log('click.......')
  $.ajax({
    type: 'POST',
    url: userSignURL,
    dataType: "json",
    data: data,
    // beforeSend: function (xhr) {
    //   xhr.setRequestHeader('api-key', apiKey); //For Local
    //   xhr.setRequestHeader('udid', getUDID());
    //   xhr.setRequestHeader('device-type', getDeviceType());
    // },
    success: function (result) {
      // $("#inputEmail").val("");
      // $("#inputPassword").val("");
      console.log("success...........",result)
      if(result.status===true){
        $("#messageSuccess").text(result.data.message);
        window.location.href = 'index';
      } else {
        let errorHtml= '<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
        result.error.message+
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
          '<span aria-hidden="true">&times;</span>'+
        '</button>'+
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