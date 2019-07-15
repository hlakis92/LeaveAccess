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
  PRIMARY KEY (`pk_locationId`));

CREATE TABLE `tbl_Employeelocataioncontactlistmapping` (
  `pk_empLocationContactLIstMappingId` INT NOT NULL AUTO_INCREMENT,
  `fk_employeeId` INT NOT NULL,
  `fk_employeeLocationMappingId` INT NOT NULL,
  `contactType` VARCHAR(45) NOT NULL,
  `contactNumber` VARCHAR(45) NULL,
  `contactName` VARCHAR(45) NOT NULL,
  `contactEmail` VARCHAR(45) NULL,
  PRIMARY KEY (`pk_empLocationContactLIstMappingId`));

CREATE TABLE `tbl_employeeworkschedulemapping` (
  `pk_empWorkSchedukeMappingId` INT NOT NULL AUTO_INCREMENT,
  `fk_employeeId` INT NOT NULL,
  `fk_employeeLocationMappingId` INT NOT NULL,
  `sunday` INT NOT NULL DEFAULT 0,
  `monday` INT NOT NULL DEFAULT 0,
  `tuesday` INT NOT NULL DEFAULT 0,
  `wednesday` INT NOT NULL DEFAULT 0,
  `thursday` INT NOT NULL DEFAULT 0,
  `friday` INT NULL DEFAULT 0,
  `saturday` INT NULL DEFAULT 0,
  PRIMARY KEY (`pk_empWorkSchedukeMappingId`));


