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

CREATE TABLE `tbl_Employeelocataioncontactlistmapping` (
  `pk_empLocationContactLIstMappingId` INT NOT NULL AUTO_INCREMENT,
  `fk_employeeId` INT NOT NULL,
  `fk_employeeLocationMappingId` INT NOT NULL,
  `contactType` VARCHAR(45) NOT NULL,
  `contactNumber` VARCHAR(45) NULL,
  `contactName` VARCHAR(45) NOT NULL,
  `contactEmail` VARCHAR(45) NULL,
  PRIMARY KEY (`pk_empLocationContactLIstMappingId`));

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
