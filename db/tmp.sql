CREATE TABLE `tbl_UserMaster` (
  `pk_userID` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`pk_userID`));

CREATE TABLE `tbl_EmployeeMaster` (
  `pk_employeeID` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NULL,
  `lastName` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `DOB` DATE NULL,
  `gender` TINYINT(2) NULL,
  `address1` VARCHAR(150) NULL,
  `address2` VARCHAR(150) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `pincode` VARCHAR(10) NULL,
  PRIMARY KEY (`pk_employeeID`));

--  script

 CREATE TABLE `tbl_EmployeeLocationMapping` (
  `pk_employeeLocationMappingId` INT NOT NULL AUTO_INCREMENT,
  `fk_employeeID` INT NULL,
  `employeeId` VARCHAR(45) NULL,
  `email` VARCHAR(100) NULL,
  `DOJ` DATE NULL,
  `hoursWork` INT NULL,
  `address` VARCHAR(200) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,                                                                                                                           `pincode` VARCHAR(10) NULL,
  PRIMARY KEY (`pk_employeeLocationMappingId`));

CREATE TABLE `tbl_EmployeeLocataionContactListMapping` (
  `pk_empLocationContactListMappingId` INT NOT NULL AUTO_INCREMENT,
  `fk_employeeId` INT NOT NULL,
  `fk_employeeLocationMappingId` INT NOT NULL,
  `contactType` VARCHAR(45) NOT NULL,
  `contactNumber` VARCHAR(45) NULL,
  `contactName` VARCHAR(45) NOT NULL,
  `contactEmail` VARCHAR(45) NULL,
  PRIMARY KEY (`pk_empLocationContactListMappingId`));

CREATE TABLE `tbl_EmployeeWorkScheduleMapping` (
  `pk_empWorkSchedukeMappingId` INT NOT NULL AUTO_INCREMENT,
  `empId` INT NOT NULL,
  `fk_locationId` INT NOT NULL,
  `sunday` INT NOT NULL DEFAULT 0,
  `monday` INT NOT NULL DEFAULT 0,
  `tuesday` INT NOT NULL DEFAULT 0,
  `wednesday` INT NOT NULL DEFAULT 0,
  `thursday` INT NOT NULL DEFAULT 0,
  `friday` INT NULL DEFAULT 0,
  `saturday` INT NULL DEFAULT 0,
PRIMARY KEY (`pk_empWorkSchedukeMappingId`));

ALTER TABLE `tbl_employeeleave`
CHANGE COLUMN `eligibility` `eligibility` JSON NULL DEFAULT NULL ,
CHANGE COLUMN `qualifying_reason` `qualifying_reason` JSON NULL DEFAULT NULL ,
CHANGE COLUMN `maximum_duration` `maximum_duration` JSON NULL DEFAULT NULL ;


ALTER TABLE `tbl_employeeleave`
ADD COLUMN `leaveInfoId` INT NULL AFTER `empId`;

ALTER TABLE tbl_leaveinfo AUTO_INCREMENT = 100000;

ALTER TABLE `tbl_LeaveInfo`
ADD COLUMN `leaveTypeStatus` VARCHAR(45) DEFAULT 'pending' AFTER `leaveType`;

ALTER TABLE `tbl_EmployeeLeave`
ADD COLUMN `leaveTypeStatus` VARCHAR(45) DEFAULT 'pending' AFTER `to_date`;

ALTER TABLE `tbl_LeaveInfo`
ADD COLUMN `leaveStatus` TINYINT(2) NULL DEFAULT 1 AFTER `leaveTypeStatus` ;


ALTER TABLE `tbl_UserMaster`
ADD `name` VARCHAR(100) NOT NULL AFTER `pk_userID`,
ADD `usertype` ENUM("Admin","Manager") NOT NULL AFTER `name`;

ALTER TABLE `tbl_UserMaster`
ADD `status` TINYINT(1) NOT NULL DEFAULT '1' AFTER `password`,
ADD `isDeleted` TINYINT(1) NOT NULL AFTER `status`;

CREATE TABLE IF NOT EXISTS `tbl_AccessToken` (
  `pk_tokenID` INT(11) NOT NULL AUTO_INCREMENT,
  `fk_userID` INT(11) NOT NULL,
  `token` VARCHAR(50) NOT NULL,
  `cretatedDateTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expiryDateTime` DATETIME NOT NULL,
  `deviceID` VARCHAR(50) NULL DEFAULT NULL,
  `isExpired` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`pk_tokenID`, `fk_userID`));

CREATE TABLE `tbl_notes` (
  `pk_noteId` int(11) NOT NULL,
  `leaveInfoId` int(11) NOT NULL,
  `empId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `notes` text NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifyBy` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1; 

CREATE TABLE `tbl_tasklist` (
  `pk_taskId` int(11) NOT NULL,
  `leaveInfoId` int(11) NOT NULL,
  `empId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `taskName` varchar(255) NOT NULL,
  `taskDesc` text NOT NULL,
  `dueDate` date NOT NULL,
  `status` tinyint(1) NOT NULL COMMENT '0=> open, 1 => Completed',
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifyBy` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `tbl_notes`
  ADD PRIMARY KEY (`pk_noteId`);

--
-- Indexes for table `tbl_tasklist`
--
ALTER TABLE `tbl_tasklist`
  ADD PRIMARY KEY (`pk_taskId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_notes`
--


ALTER TABLE `tbl_notes`
  MODIFY `pk_noteId` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `tbl_tasklist`
  MODIFY `pk_taskId` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `tbl_LeaveInfo`
ADD COLUMN `ERTW_userId` INT AFTER `leaveStatus`,
ADD COLUMN `ERTWDate` DATE AFTER `ERTW_userId`,
ADD COLUMN `ARTW_userId` INT AFTER `ERTWDate`,
ADD COLUMN `ARTWDate` DATE AFTER `ARTW_userId`;

CREATE TABLE `tbl_PaperWorkReview` (
  `pk_paperWorkReviewId` INT NOT NULL AUTO_INCREMENT,
  `leaveInfoId` INT NOT NULL,
  `paperWorkName` VARCHAR(45) NOT NULL,
  `isPaperWorkReview` TINYINT(1) NOT NULL DEFAULT 0,
  `createdDate` DATETIME NOT NULL DEFAULT current_timestamp(),
PRIMARY KEY (`pk_paperWorkReviewId`));

CREATE TABLE `tbl_PaperWorkReviewDocument` (
  `pk_paperWorkReviewDocumentId` INT NOT NULL AUTO_INCREMENT,
  `leaveInfoId` INT NOT NULL,
  `documentName` VARCHAR(45) NOT NULL,
  `createdDate` DATETIME NOT NULL DEFAULT current_timestamp(),
PRIMARY KEY (`pk_paperWorkReviewDocumentId`));

ALTER TABLE `tbl_LocationMaster`
ADD `supervisorContactName` VARCHAR(45) NULL,
ADD `supervisorContactNumber` VARCHAR(45) NULL,
ADD `supervisorContactEmail` VARCHAR(45) NULL,
ADD `HRContactName` VARCHAR(45) NULL,
ADD `HRContactNumber` VARCHAR(45) NULL,
ADD `HRContactEmail` VARCHAR(45) NULL,
ADD `PBContactName` VARCHAR(45) NULL,
ADD `PBContactNumber` VARCHAR(45) NULL,
ADD `PBContactEmail` VARCHAR(45) NULL;

CREATE TABLE `tbl_LeaveDeterminationDecision` (
  `pk_leaveDeterminationDecisionID` INT NOT NULL AUTO_INCREMENT,
  `startDate` DATE NOT NULL,
  `endDate` DATE NOT NULL,
  `leaveTypeStatus` VARCHAR(45) NOT NULL,
  `fk_leaveInfoId` INT NOT NULL,
  `fk_empId` INT NOT NULL,
PRIMARY KEY (`pk_leaveDeterminationDecisionID`));

CREATE TABLE `tbl_LeaveChronology` (
  `pk_leaveChronologyId` INT NOT NULL AUTO_INCREMENT,
  `leave_type_id` INT NULL,
  `processCode` VARCHAR(25) NULL,
  `processName` VARCHAR(45) NULL,
  `processTemplate` VARCHAR(150) NULL,
  PRIMARY KEY (`pk_leaveChronologyId`));

CREATE TABLE `tbl_LeaveChronologyMapping` (
`pk_leaveChronologyMappingId` INT NOT NULL AUTO_INCREMENT,
`leaveType` VARCHAR(25) NULL,
`fk_leaveChronologyId` INT NULL,
`fk_leaveInfoId` INT NULL,
`data` JSON NULL,
`fk_createdBy` INT,
`createdDate` Datetime NOT NULL DEFAULT NOW(),
PRIMARY KEY (`pk_leaveChronologyMappingId`));

INSERT INTO `tbl_LeaveChronology` (`pk_leaveChronologyId`, `leave_type_id`, `processCode`, `processName`, `processTemplate`) VALUES ('1', '1', 'CREATE_LEAVE', 'Create New Leave', 'A new \"Continuous\" leave was initiated for \"{{leave_name}}\" with dates \"{{start_date}} - {{end_date}}\".');
INSERT INTO `tbl_LeaveChronology` (`pk_leaveChronologyId`, `leave_type_id`, `processCode`, `processName`, `processTemplate`) VALUES ('2', '1', 'ELI_LETTER', 'Eligibility Letter', 'Task Completed and Letter Sent To Employee and Supervisor');
INSERT INTO `tbl_LeaveChronology` (`pk_leaveChronologyId`, `leave_type_id`, `processCode`,`processName`, `processTemplate`) VALUES ('3', '1', 'PAPER_ATT', 'Paperwork Attached', 'Paperwork attached with name {{file_name}} and Paperwork Review Task set for {{date}}');
INSERT INTO `tbl_LeaveChronology` (`pk_leaveChronologyId`, `leave_type_id`, `processCode`,`processName`, `processTemplate`) VALUES ('4', '1', 'PAPER_REVIEW', 'Paperwork Review', 'Review Completed, Paperwork Incomplete, Incomplete Letter Sent');
INSERT INTO `tbl_LeaveChronology` (`pk_leaveChronologyId`, `leave_type_id`, `processCode`,`processName`, `processTemplate`) VALUES ('5', '1', 'PAPER_REVIEW_ATT','Paperwork Attached', 'Paperwork Review Task set for {{date}}');
INSERT INTO `tbl_LeaveChronology` (`pk_leaveChronologyId`, `leave_type_id`, `processCode`,`processName`, `processTemplate`) VALUES ('6', '1', 'TASK_CREATE', 'Task Created', 'A task was created for date \"{{date}}\" with name \"{{task_name}}\" and with Comment \"{{task_comment}}\".');
INSERT INTO `tbl_LeaveChronology` (`pk_leaveChronologyId`, `leave_type_id`, `processCode`,`processName`, `processTemplate`) VALUES ('7', '1', 'TASK_EDIT', 'Task Edited', 'Task Name \"{{old_task_name}}\" was changed to name \"{{task_name}}\" and comment added \"{{task_comment}}\".');
INSERT INTO `tbl_LeaveChronology` (`pk_leaveChronologyId`, `leave_type_id`, `processCode`,`processName`, `processTemplate`) VALUES ('8', '1', 'NOTE_ADD', 'Note Added', 'Note Added with Comment \"{{note_comment}}\"');
INSERT INTO `tbl_LeaveChronology` (`pk_leaveChronologyId`, `leave_type_id`, `processCode`,`processName`, `processTemplate`) VALUES ('9', '1', 'TASK_COMPLETE', 'Task Completed', 'Task completed with Comment \"{{task_comment}}\"');
INSERT INTO `tbl_LeaveChronology` (`pk_leaveChronologyId`, `leave_type_id`, `processCode`,`processName`, `processTemplate`) VALUES ('10', '1', 'PROVIDER_INFO_ADD', 'Provider Information Added', 'Provider Added: <br><br>{{name}}  <br>{{type}} <br>Phone: {{phone}} <br>Fax:{{fax}}');
INSERT INTO `tbl_LeaveChronology` (`pk_leaveChronologyId`, `leave_type_id`, `processCode`,`processName`, `processTemplate`) VALUES ('11', '1', 'DECISION_UDPATE', 'Decision Updated', 'Leave Approved for dates \"{{start_date}} through {{end_date}}\" Decision Task date set for \"{{date}}\"');
INSERT INTO `tbl_LeaveChronology` (`pk_leaveChronologyId`, `leave_type_id`, `processCode`,`processName`, `processTemplate`) VALUES ('12', '1', 'ELIGIBILTY_UPDATE', 'Eligibility Updated', 'Leave Eligibility Plan \"{{leave_plan}}\" updated to \"{{update}}\"');
INSERT INTO `tbl_LeaveChronology` (`pk_leaveChronologyId`, `leave_type_id`, `processCode`,`processName`, `processTemplate`) VALUES ('13', '1', 'DECISION_DENIED', 'Decision Updated', 'Leave Denied for dates \"{{start_date}} through {{end_date}}\"');
INSERT INTO `tbl_LeaveChronology` (`pk_leaveChronologyId`, `leave_type_id`, `processCode`,`processName`, `processTemplate`) VALUES ('14', '1', 'CLOSE_LEAVE', 'Close Leave', 'Leave automatically closed as Decision was made for all dates of leave and end date has passed');
INSERT INTO `tbl_LeaveChronology` (`pk_leaveChronologyId`, `leave_type_id`, `processCode`, `processName`, `processTemplate`) VALUES ('', '1', 'DECISION_UDPATE_RW', 'Decision Updated', 'Leave Approved for dates \"{{start_date}} through {{end_date}}\" with Reduced Schedule \"S: 0, M: 4, T: 4, W: 4, Th: 4, F: 4, Sa: 0\"');

ALTER TABLE `tbl_LeaveInfo`
ADD COLUMN `PRDate` DATE NULL DEFAULT NULL AFTER `ARTW_userId`,
ADD COLUMN `PR_userId` INT(11) NULL DEFAULT NULL AFTER `PRDate`,
ADD COLUMN `EDate` DATE NULL DEFAULT NULL AFTER `PR_userId`,
ADD COLUMN `E_userId` INT(11) NULL DEFAULT NULL AFTER `EDate`,
ADD COLUMN `DDate` DATE NULL DEFAULT NULL AFTER `E_userId`,
ADD COLUMN `D_userId` INT(11) NULL DEFAULT NULL AFTER `DDate`;

ALTER TABLE `tbl_LeaveInfo`
ADD COLUMN `createdDate` DATETIME NOT NULL DEFAULT NOW() AFTER `D_userId`;

ALTER TABLE `tbl_LeaveInfo`
ADD COLUMN `flare_ups_param` TEXT NULL AFTER `D_userId`,
ADD COLUMN `office_visits_param` TEXT NULL AFTER `flare_ups_param`;

