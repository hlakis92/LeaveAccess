let applicationConfiguration = {
  "APPLICATION_API_KEY": ["1", "b2236bde3ffbe7b27f425ae889ca1e08"], // local and 2.16
  "MAX_ACCESS_TOKEN_EXPIRY_HOURS": 24, // 1 days
  "PAGE_SIZE": 10, //
  "API_START_PATH": '/api/',
  "DB_DATE_FORMAT_DOB": '%Y-%m-%d',
  "DB_DATE_FORMAT": '%Y-%m-%d %H:%M:%S',
  "MEDIA_UPLOAD_DIR": '/home/ubuntu/media/tmp/', // live
  // "MEDIA_UPLOAD_DIR": 'C:\\Users\\Ashish Vaghasiya\\Downloads\\media\\tmp\\', // local - ashish
  "MEDIA_GET_STATIC_URL": 'https://leave-media.s3.us-east-2.amazonaws.com/',
  "MEDIA_UPLOAD_FILE_NAME_SETTINGS": {
    "length": 12,
  },
  "S3_CONFIG": {
    "ACCESS_KEY_ID": "AKIA34BJA5WZCCLHIWPJ",
    "SECRET_ACCESS_KEY": "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",
    "MEDIA_DEFAULT_BUCKET_NAME": "leave-media",
    "REGION": "us-east-2",
    "API_VERSION": "latest"
  },
};


let requestMessages = {
  'ERR_API_BLOCK_ON_SPECIFY_TIME': {
    code: 1999,
    message: 'This functionality is not active in weekend 9:00 AM to 3:00 PM.'
  },
  'ERR_INVALID_API_REQUEST': {
    code: 2000,
    message: 'Invalid api request.'
  },
  'ERR_API_KEY_NOT_FOUND': {
    code: 2001,
    message: 'api-key not found'
  },
  'ERR_INVALID_API_KEY': {
    code: 2002,
    message: 'Invalid api-key'
  },
  'ERR_UDID_NOT_FOUND': {
    code: 2003,
    message: 'UDID not found'
  },
  'ERR_DEVICE_TYPE_NOT_FOUND': {
    code: 2004,
    message: 'device-type not found'
  },
  'ERR_INVALID_SIGNUP_REQUEST': {
    code: 2005,
    message: 'Invalid signup request'
  },
  'ERR_INVALID_ADD_EMPLOYEE_REQUEST': {
    code: 2006,
    message: 'Invalid add employee request'
  },
};

let userMessages = {
  ERR_IN_SIGNIN: {
    code: 2001,
    message: 'Incorrect email or password. please try again.'
  },
  MSG_SIGNIN_SUCCESSFULLY: {
    code: 2002,
    message: 'Signin successfully.'
  },
  NO_RECORD_FOUND: {
    code: 2003,
    message: 'No Record Found.'
  },
  USER_ADDDED: {
    code: 2004,
    message: 'User has been added successfully.'
  },
  USER_UPDATED: {
    code: 2005,
    message: 'User has been updated successfully.'
  },
  USER_DELETED: {
    code: 2006,
    message: 'User has been deleted successfully.'
  }, 
  USER_ERROR: {
    code: 2007,
    message: 'User module error.'
  },
  USER_ALREADY_EXIST: {
    code: 2008,
    message: 'User already exist!'
  },
};


let taskMessages = {
  NO_RECORD_FOUND: {
    code: 2001,
    message: 'No Record Found.'
  },
  TASK_ADDDED: {
    code: 2002,
    message: 'Task has been added successfully.'
  },
  TASK_UPDATED: {
    code: 2003,
    message: 'Task has been updated successfully.'
  },
  TASK_DELETED: {
    code: 2004,
    message: 'Task has been deleted successfully.'
  }, 
  TASK_ERROR: {
    code: 2005,
    message: 'Task module error.'
  },
  NOTES_ADDDED: {
    code: 2006,
    message: 'Notes has been added successfully.'
  },
  NOTES_UPDATED:{
     code: 2007,
    message: 'Notes has been updated successfully.'
  },
  NOTES_ERROR: {
    code: 2008,
    message: 'Notes module error.'
  },
};

let employeeMessages = {
  ERR_IN_ADD_EMPLOYEE: {
    code: 3001,
    message: 'Error while adding employee.'
  },
  MSG_ADD_EMPLOYEE_SUCCESSFULLY: {
    code: 3002,
    message: 'Employee has been added successfully.'
  },
  ERR_EMPLOYEE_NOT_FOUND:{
    code: 3003,
    message: 'Employees does not found.'
  }
};

let leaveMessages = {
  ERR_IN_EMPLOYEE_ID_ALREADY_EXIST: {
    code: 4001,
    message: 'Employee ID already exist.'
  },
  MSG_RETURN_TO_WORK_CONFIRMATION_ADDED_SUCCESSFULLY:{
    code: 4002,
    message: '{{type}} added successfully.'
  },
  MSG_PAPER_WORK_REVIEW_UPDATED_SUCCESSFULLY:{
    code: 4003,
    message: 'paper work review updated successfully.'
  },
  MSG_LEAVE_DETERMINATION_DECISION_ADDED_SUCCESSFULLY:{
    code: 4004,
    message: 'Leave determination decision added successfully'
  }
};

let emailTemplates = {
  ARTWLetter:'' +
    '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '<head>\n' +
    '    <meta charset="UTF-8">\n' +
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
    '    <meta http-equiv="X-UA-Compatible" content="ie=edge">\n' +
    '    <title>ARTW Letter to Send</title>\n' +
    '</head>\n' +
    '<style>\n' +
    '    .employeeName {\n' +
    '        margin: 0;\n' +
    '        margin-block-start: 0;\n' +
    '        margin-block-end: 0;\n' +
    '    }\n' +
    '    .employeeAddress {\n' +
    '        margin: 0;\n' +
    '        margin-block-start: 0;\n' +
    '        margin-block-end: 0;\n' +
    '    }\n' +
    '    body {\n' +
    '        font-family: Cambria,Georgia,serif; \n' +
    '        margin-top: 100px;\n' +
    '        margin-bottom: 100px;\n' +
    '        margin-right: 150px;\n' +
    '        margin-left: 10%;\n' +
    '    }\n' +
    '    .signatureOfER {\n' +
    '        font-size: 40px;\n' +
    '        font-family: Brush Script MT, Brush Script Std, cursive; \n' +
    '    }\n' +
    '</style>\n' +
    '<body>'+
    '<h4 class="dateOfLetter">Date: {{letter_date}}</h4>\n' +
    '    <h4 class="employeeName">{{first_name}} {{last_name}}</h4>\n' +
    '    <p class="employeeAddress">{{address1}} <br> {{city}}, {{state}}, {{pincode}}</p>\n' +
    '    <br><br>\n' +
    '    <p class="employeenFirstName">Dear Name,</p>\n' +
    '    <p class="firstP">We understand that your leave is set to end on <span>{{endDate}}</span>!We have already\n' +
    '        received your return to work note.</p>\n' +
    '    <p class="secondP">We further understand that you returned on <span>{{ARTWDate}}</span>.</p>\n' +
    '    <p class="endPar">Please feel free to email company@company.com, or call 888-888-8888 with any questions!</p>\n' +
    '    <p class="ep">Sincerely,</p>\n' +
    '\n' +
    '\n' +
    '    <h2 class="signatureOfER">Signature</h2>\n' +
    '\n' +
    '    <p class="leaveManager">Leave Admin Name<br>\n' +
    '        Leave of Absence Representative</p>'+
    '</body>\n' +
    '</html>'
  ,
  ERTWLetter : '' +
    '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '<head>\n' +
    '    <meta charset="UTF-8">\n' +
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
    '    <meta http-equiv="X-UA-Compatible" content="ie=edge">\n' +
    '    <title>ERTW Letter to Send</title>\n' +
    '</head>\n' +
    '<style>\n' +
    '    .employeeName {\n' +
    '        margin: 0;\n' +
    '        margin-block-start: 0;\n' +
    '        margin-block-end: 0;\n' +
    '    }\n' +
    '    .employeeAddress {\n' +
    '        margin: 0;\n' +
    '        margin-block-start: 0;\n' +
    '        margin-block-end: 0;\n' +
    '    }\n' +
    '    body {\n' +
    '        font-family: Cambria,Georgia,serif; \n' +
    '        margin-top: 100px;\n' +
    '        margin-bottom: 100px;\n' +
    '        margin-right: 150px;\n' +
    '        margin-left: 10%;\n' +
    '    }\n' +
    '    .signatureOfER {\n' +
    '        font-size: 40px;\n' +
    '        font-family: Brush Script MT, Brush Script Std, cursive; \n' +
    '    }\n' +
    '</style>\n' +
    '<body>'+
    '<h4 class="dateOfLetter">Date:{{letter_date}}</h4>\n' +
    '    <h4 class="employeeName">{{first_name}} {{last_name}}</h4>\n' +
    '    <p class="employeeAddress">{{address1}} <br> {{city}}, {{state}}, {{pincode}}</p>\n' +
    '    <br><br>\n' +
    '    <p class="employeenFirstName">Dear Name,</p>\n' +
    '    <p class="firstP">We understand that your leave is set to end on <span>{{endDate}}</span>! Unfortunately, we have\n' +
    '        not received a return to work note and cannot release you to return to work until\n' +
    '        we have a release on file.</p>\n' +
    '    <p class="secondP">Please have your attending provider complete the attached "Return to Work\n' +
    '        Note" or send a return to work note on letterhead before returning to work. If\n' +
    '        you have any further questions, please do not hesitate to ask!</p>\n' +
    '    <p class="endPar">Please feel free to email it in to company@company.com, or fax: 888-888-8888 it\n' +
    '        in!</p>\n' +
    '    <p class="ep">Sincerely,</p>\n' +
    '    \n' +
    '    \n' +
    '    <h2 class="signatureOfER">Signature</h2>\n' +
    '    \n' +
    '    <p class="leaveManager">Leave Admin Name<br>\n' +
    '        Leave of Absence Representative</p>'+
    '</body>\n' +
    '</html>'
  ,
  DeniedLetter: '' +
  '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'    <meta charset="UTF-8">\n' +
'    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'    <meta http-equiv="X-UA-Compatible" content="ie=edge">\n' +
'    <title>Denial    Letter to Send</title>\n' +
'</head>\n' +
'<style>\n' +
'    body {\n' +
'        font-family: Cambria,Georgia,serif; \n' +
'        margin-top: 75px;\n' +
'        margin-bottom: 100px;\n' +
'        margin-right: 50px;\n' +
'        margin-left: 50px;\n' +
'    }\n' +
'    .employeeName {\n' +
'        margin: 0;\n' +
'        margin-block-start: 0;\n' +
'        margin-block-end: 0;\n' +
'    }\n' +
'    .employeeAddress {\n' +
'        margin: 0;\n' +
'        margin-block-start: 0;\n' +
'        margin-block-end: 0;\n' +
'    }\n' +
'    \n' +
'    .signatureOfER {\n' +
'        font-size: 40px;\n' +
'        font-family: Brush Script MT, Brush Script Std, cursive; \n' +
'    }\n' +
'    .secondP {\n' +
'        font-weight: bold;\n' +
'    }\n' +
'    .leavetable {\n' +
'        position:absolute;\n' +
'    }\n' +
'    table { \n' +
'            border: 1px solid black; \n' +
'            border-collapse: collapse; \n' +
'            width: 100%;\n' +
'        } \n' +
'    th {\n' +
'        border: 1px solid black; \n' +
'        border-collapse: collapse; \n' +
'        width: auto;\n' +
'    }\n' +
'    td {\n' +
'        border: 1px solid black; \n' +
'        border-collapse: collapse; \n' +
'        width: 100%;\n' +
'    }\n' +
'    .tableStatusDenied {\n' +
'        background-color: red;\n' +
'    }\n' +
'    .leaveTypeTableEdit {\n' +
'        width: 15%;\n' +
'    }\n' +
'    .leaveNameTableEdit {\n' +
'        width: 15%;\n' +
'    }\n' +
'    .leaveDatesTableEdit {\n' +
'        width: 31%;\n' +
'    }\n' +
'    .leaveReasonTableEdit {\n' +
'        width: 39%;\n' +
'    }\n' +
'\n' +
'</style>\n' +
'<body>'+
    '<h4 class="dateOfLetter">Date: {{letter_date}}</h4>\n' +
    '    <h4 class="employeeName">{{first_name}} {{last_name}}</h4>\n' +
    '    <p class="employeeAddress">{{address1}} <br> {{city}}, {{state}}, {{pincode}}</p>\n' +
    '    <br>\n' +
    '    <p class="employeenFirstName">Dear {{first_name}} {{last_name}},</p>\n' +
    '\n' +
    '    <p class="firstP">This letter provides you with information about your \n' +
    '        <span class="leaveType">{{leave_type_of_leave}}</span>\n' +
    '        leave requested on \n' +
    '        <span class="dateOpened">{{startDate}}</span>\n' +
    '        due to <span class="leaveReason">New Job Opportunity</span> \n' +
    '        beginning <span class="leaveDates">{{startDate}} through {{endDate}}</span>.</p>\n' +
    '\n' +
    '    <p class="secondP">PLEASE NOTE: If you have received a previous leave status notification from Company\n' +
    '        Leave Administration for this leave, this notice will supersede the previously communicated\n' +
    '        information. Please see below for your current leave status based on the most recent\n' +
    '        information available.</p>\n' +
    '\n' +
    '    <p class="endPar">As of the date of this letter, listed below are the leave type(s) and dates for which you have been\n' +
    '        determined to be ineligible/denied:</p>\n' +
    '        <table class="leaveTable" BORDER="1">\n' +
    '            <tr>\n' +
    '               <th align="center" class="tableStatusDenied" style="font-weight: 100%;"COLSPAN="4">\n' +
    '                  Denied\n' +
    '               </th>\n' +
    '            </tr>\n' +
    '            <tr align="left">    \n' +
    '               <th class="leaveTypeTableEdit">Leave Type</th>\n' +
    '               <th class="leaveNameTableEdit">Leave Name</th>\n' +
    '               <th class="leaveDatesTableEdit">Dates</th>\n' +
    '               <th class="leaveReasonTableEdit">Reason</th>\n' +
    '            </tr>\n' +
    '            <tr align="left">\n' +
    '                <th class="leaveTypeTableEdit">{{state}}</th>\n' +
    '                <th class="leaveNameTableEdit">{{leave_name}}</th>\n' +
    '                <th class="leaveDatesTableEdit">{{startDate}} - {{endDate}}</th>\n' +
    '                <th class="leaveReasonTableEdit">{{reason}}</th>\n' +
    '             </tr>\n' +
    '        </table>\n' +
    '        <p class="firstP">Please review the following important information \n' +
    '            and/or enclosures relating to your leave: \n' +
    '        </p>\n' +
    '    \n' +
    '        <ul>\n' +
    '            <li>Employee Rights and Responsibilities under FMLA: This document provides\n' +
    '                leave of absence information and eligibility requirements for FMLA.</li>\n' +
    '            <li> \n' +
    '                Frequently Asked Questions: This document provides answers to the most\n' +
    '                commonly asked questions about the effect this leave will have on your benefits\n' +
    '                and pay.\n' +
    '            </li>\n' +
    '        </ul>\n' +
    '    \n' +
    '        <p>If you are not approved for any requested time, you will need to contact\n' +
    '            Companyaddress@address.com to discuss your work schedule or other leave options that might\n' +
    '            be available to you.</p>\n' +
    '        <p>Please call us at Companyaddress@address.com if you have \n' +
    '            any questions or if the circumstances\n' +
    '            or dates of your leave change.You should also inform \n' +
    '            Companyaddress@address.com of any changes to your leave status.</p>\n' +
    '       \n' +
    '        <p>Sincerely,</p>\n' +
    '        <p class="leaveManager">Leave Admin Name<br>\n' +
    '            Leave of Absence Representative</p>' +
  '</body>\n' +
'</html>'
  ,
  leaveEligibilityTable:'' +
    '<th>Federal</th>\n' +
    '                <th>Family & Medical Leave Act (FMLA)</th>\n' +
    '                <th>01/16/2020 - 02/15/2020</th>\n' +
    '                <th>Eligibility Not Met:<br> \n' +
    '                    <ul style="margin-top: 0;" align="left" >\n' +
    '                    <li>1250 hours worked in previous 12 Month</li>\n' +
    '                    <li> 12 Months of Service</li>\n' +
    '                </ul> </th>' +
    ''
  ,
  incompleteLetter:'' +
    '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '<head>\n' +
    '    <meta charset="UTF-8">\n' +
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
    '    <meta http-equiv="X-UA-Compatible" content="ie=edge">\n' +
    '    <title>Incomplete Letter to Send</title>\n' +
    '</head>\n' +
    '<style>\n' +
    '    body {\n' +
    '        font-family: Cambria,Georgia,serif; \n' +
    '        margin-top: 75px;\n' +
    '        margin-bottom: 100px;\n' +
    '        margin-right: 50px;\n' +
    '        margin-left: 50px;\n' +
    '    }\n' +
    '    .employeeName {\n' +
    '        margin: 0;\n' +
    '        margin-block-start: 0;\n' +
    '        margin-block-end: 0;\n' +
    '    }\n' +
    '    .employeeAddress {\n' +
    '        margin: 0;\n' +
    '        margin-block-start: 0;\n' +
    '        margin-block-end: 0;\n' +
    '    }\n' +
    '    \n' +
    '    .signatureOfER {\n' +
    '        font-size: 40px;\n' +
    '        font-family: Brush Script MT, Brush Script Std, cursive; \n' +
    '    }\n' +
    '    .secondP {\n' +
    '        font-weight: bold;\n' +
    '    }\n' +
    '    .leavetable {\n' +
    '        position:absolute;\n' +
    '    }\n' +
    '    table { \n' +
    '            border: 1px solid black; \n' +
    '            border-collapse: collapse; \n' +
    '            width: 100%;\n' +
    '        } \n' +
    '    th {\n' +
    '        border: 1px solid black; \n' +
    '        border-collapse: collapse; \n' +
    '        width: auto;\n' +
    '    }\n' +
    '    td {\n' +
    '        border: 1px solid black; \n' +
    '        border-collapse: collapse; \n' +
    '        width: 100%;\n' +
    '    }\n' +
    '    .tableStatusDenied {\n' +
    '        background-color: red;\n' +
    '    }\n' +
    '    .tableStatusPending {\n' +
    '        background-color: lightgray;\n' +
    '    }\n' +
    '    .leaveTypeTableEdit {\n' +
    '        width: 15%;\n' +
    '    }\n' +
    '    .leaveNameTableEdit {\n' +
    '        width: 15%;\n' +
    '    }\n' +
    '    .leaveDatesTableEdit {\n' +
    '        width: 31%;\n' +
    '    }\n' +
    '    .leaveReasonTableEdit {\n' +
    '        width: 39%;\n' +
    '    }\n' +
    '    .leaveTypeUpdate {\n' +
    '        width: 15%;\n' +
    '    }\n' +
    '    .leaveReasonUpdate {\n' +
    '        width: 40%;\n' +
    '    }\n' +
    '    .leaveDatesUpdate {\n' +
    '        width: 31%;\n' +
    '    }\n' +
    '\n' +
    '</style>\n' +
    '<body>'+
    '<h4 class="dateOfLetter">Date: {{letter_date}}</h4>\n' +
    '    <h4 class="employeeName">{{first_name}} {{last_name}}</h4>\n' +
    '    <p class="employeeAddress">{{address1}} <br> {{city}}, {{state}}, {{pincode}}</p>\n' +
    '    <br>\n' +
    '    <p class="employeenFirstName">Dear {{first_name}} {{last_name}},</p>\n' +
    '\n' +
    '    <p class="firstP">We have received notification on your <span class="leaveType">{{leave_type_of_leave}}</span>\n' +
    '        request for Leave of Absence\n' +
    '        due to <span class="leaveReason">{{leave_name}}</span>\n' +
    '        beginning <span class="leaveDates">{{startDate}} through {{endDate}}</span>. This letter serves as notification of your\n' +
    '        rights and responsibilities for leave under federal and state entitlements.</p>\n' +
    '\n' +
    '    <p class="endPar">Listed below are the leave type(s) \n' +
    '        you are eligible for today and the status of each plan:</p>\n' +
    '        <table class="leaveTable" BORDER="1">\n' +
    '            <tr>\n' +
    '               <th align="center" class="tableStatusPending" style="font-weight: 100%;"COLSPAN="4">\n' +
    '                   {{leave_type_status}}\n' +
    '               </th>\n' +
    '            </tr>\n' +
    '            <tr align="left">    \n' +
    '               <th class="leaveTypeTableEdit">Leave Type</th>\n' +
    '               <th class="leaveNameTableEdit">Leave Name</th>\n' +
    '               <th class="leaveDatesTableEdit">Dates</th>\n' +
    '            </tr>\n' +
    '             <tr align="left">\n' +
    '                <th class="leaveTypeUpdate">{{state}}</th>\n' +
    '                <th class="leaveReasonUpdate">{{leave_name}}</th>\n' +
    '                <th class="leaveDatesUpdate">{{startDate}} - {{endDate}}</th>\n' +
    '             </tr>\n' +
    '        </table>\n' +
    '        <br>\n' +
    '\n' +
    '        <p class="firstP">The documentation requested in support of the leave types above has been received; however, it is\n' +
    '            incomplete and we are unable to take action regarding your leave request at this time. <br>The updated paperwork will be due within 10 calendar days from the first date of absence. The\n' +
    '            specific information below is required to support this leave:\n' +
    '        </p>\n' +
    '    \n' +
    '        <ul>\n' +
    '            <li>Missing Licensed Health Care Profession Information such as name/practice type.</li>\n' +
    '            <li>Missing Serious Health Condition </li>\n' +
    '            <li>Missing Estimated Start date and/or End date for leave/Missing Parameters for Time Off.</li>\n' +
    '            <li>Missing Doctor\'s hand signature and/or date form was filled out.</li>\n' +
    '            <li>Missing Important/Necessary Information.</li>\n' +
    '        </ul>\n' +
    '    \n' +
    '        <p>Your updated information can be mailed to us at the address shown above, or faxed to\n' +
    '            855-616-8288. Please note that any changes/updates made to the incomplete\n' +
    '            Certification of Healthcare Provider must be initialed and dated by the healthcare provider.</p>\n' +
    '        <p>Failure to provide the requested information by the due date may result in denial of leave\n' +
    '            protection. If this occurs, then any time you have missed may be considered an unexcused\n' +
    '            absence under Life Time’s attendance policy.</p>\n' +
    '        <p>The final determination on your leave request is based on your eligibility and entitlement as of\n' +
    '            your first day of absence, as well as timely submission of any supporting documentation, if\n' +
    '            applicable, as note below. Once we obtain this information, we will inform you whether your leave\n' +
    '            is designated as Family and Medical Leave Act. You will be notified of any change in your leave\n' +
    '            status.</p>\n' +
    '        <p>SUBMIT THE REQUESTED SUPPORTING DOCUMENTATION BY {{last_date}}.</p>\n' +
    '\n' +
    '        <p class="firstP">Provided review the following important information \n' +
    '            and/or enclosures relating to your leave: \n' +
    '        </p>\n' +
    '    \n' +
    '        <ul>\n' +
    '            <li>Employee Rights and Responsibilities under FMLA: This document provides\n' +
    '                leave of absence information and eligibility requirements for FMLA.</li>\n' +
    '            <li> \n' +
    '                Frequently Asked Questions: This document provides answers to the most\n' +
    '                commonly asked questions about the effect this leave will have on your benefits\n' +
    '                and pay.\n' +
    '            </li>\n' +
    '        </ul>\n' +
    '        <p>If you are not approved for any requested time, you will need to contact company@company.com to\n' +
    '            discuss your work schedule or other leave options that might be available to you.</p>\n' +
    '\n' +
    '        <p>The Genetic Information Nondiscrimination Act of 2008 (GINA) prohibits employers and other\n' +
    '            entities covered by GINA Title II from requesting or requiring genetic information of an individual\n' +
    '            or family member of the individual, except as specifically allowed by this law. To comply with this\n' +
    '            law, we are asking that you and your physicians not provide any genetic information when\n' +
    '            responding to any request for medical information, such as in the Healthcare Certification\n' +
    '            response from a physician. “Genetic information,” as defined by GINA, includes an individual’s\n' +
    '            family medical history, the results of an individual’s or family member’s genetic tests, the fact that\n' +
    '            an individual or an individual’s family member sought or received genetic services, and genetic\n' +
    '            information of a fetus carried by an individual or an individual’s family member or an embryo\n' +
    '            lawfully held by an individual or family member receiving assistive reproductive services.</p>\n' +
    '        \n' +
    '        <p>If your leave is the result of a company policy, please refer to company@company.com for your\n' +
    '            return to work guidelines.</p>\n' +
    '        <p>You should also inform company@company.com of any changes to your leave status.</p>\n' +
    '       \n' +
    '        <p>Sincerely,</p>\n' +
    '        <p class="leaveManager">\n' +
    '            Company Leave of Absence</p>'+
  '</body>\n' +
'</html>',
}

module.exports = {
  appConfig: applicationConfiguration,
  requestMessages: requestMessages,
  userMessages: userMessages,
  employeeMessages: employeeMessages,
  leaveMessages: leaveMessages,
  taskMessages: taskMessages,
  emailTemplates:emailTemplates
};
