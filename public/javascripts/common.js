// let apiKey = "1"; // local
let apiKey = "leaveAccess"; // live


function setCookie(cname, cvalue, exdays) {
  let d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname) {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function deleteCookie(cname) {
  document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function checkCookie(cname, cvalue) {
  let value = this.getCookie(cname);
  if (value !== '') {
    return value;
  } else {
    // uuid = UUID.UUID();
    if (cvalue !== '' && cvalue !== null) {
      // uuid = UUID.UUID();
      this.setCookie(cname, cvalue, 365);
      return cvalue;
    }
  }
}

function generatingTemplate(template, data, dataWrapperStartSign, dataWrapperEndSign) {
  // debug("common -> generatingTemplate");
  var returnTemplate = template;
  var dataStartSign = dataWrapperStartSign || '{{';
  var dataEndSign = dataWrapperEndSign || '}}';

  while (true) {
    if (returnTemplate.length > 0) {
      var str = returnTemplate;
      var n1 = str.indexOf(dataStartSign);
      var n2 = str.indexOf(dataEndSign);
      if (n1 == -1 || n2 == -1 || n1 >= n2) {
        break;
      } else {
        var variable = str.substr(n1, n2 - n1 + 2);
        var key = (str.substr(n1 + 2, n2 - n1 - 2)).trim();

        if (data.hasOwnProperty(key)) {
          var value = data[key];
          returnTemplate = returnTemplate.replace(variable, value);
        } else {
          // debug(key);
          // debug("invalid key : " + variable);
          break;
        }
      }
    } else {
      break;
    }
  }
  return returnTemplate;
};
