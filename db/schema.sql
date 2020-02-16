CREATE DATABASE Leave_Access;

CREATE TABLE `tbl_UserMaster` (
  `pk_userID` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`pk_userID`));


INSERT INTO `tbl_UserMaster` (`email`, `password`) VALUES ('admin@gmail.com', '202cb962ac59075b964b07152d234b70');
INSERT INTO `tbl_UserMaster` (`email`, `password`) VALUES ('supervisor@gmail.com', '202cb962ac59075b964b07152d234b70');

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `tbl_CountryMaster`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tbl_CountryMaster` (
  `pk_countryID` INT NOT NULL AUTO_INCREMENT,
  `countryCode` VARCHAR(10) NOT NULL,
  `countryName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`pk_countryID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tbl_StateMaster`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tbl_StateMaster` (
  `pk_stateID` INT NOT NULL AUTO_INCREMENT,
  `fk_countryID` INT NOT NULL,
  `stateName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`pk_stateID`),
  INDEX `fk_tbl_StateMaster_1_idx` (`fk_countryID` ASC),
  CONSTRAINT `fk_tbl_StateMaster_1`
    FOREIGN KEY (`fk_countryID`)
    REFERENCES `tbl_CountryMaster` (`pk_countryID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tbl_CityMaster`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tbl_CityMaster` (
  `pk_cityID` INT NOT NULL AUTO_INCREMENT,
  `fk_countryID` INT NOT NULL,
  `fk_stateID` INT NOT NULL,
  `CityName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`pk_cityID`),
  INDEX `fk_table1_1_idx` (`fk_countryID` ASC),
  INDEX `fk_table1_2_idx` (`fk_stateID` ASC),
  CONSTRAINT `fk_table1_1`
    FOREIGN KEY (`fk_countryID`)tbl_EmployeeMaster
    REFERENCES `tbl_CountryMaster` (`pk_countryID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_table1_2`
    FOREIGN KEY (`fk_stateID`)
    REFERENCES `tbl_StateMaster` (`pk_stateID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tbl_UserTypeMaster`
-- -----------------------------------------------------
--  CREATE TABLE IF NOT EXISTS `tbl_UserTypeMaster` (
--  `pk_userTypeID` INT NOT NULL AUTO_INCREMENT,
--  `userType` VARCHAR(45) NULL,
--  PRIMARY KEY (`pk_userTypeID`))
-- ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tbl_UserMaster`
-- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `tbl_UserMaster` (
--  `pk_userID` INT NOT NULL AUTO_INCREMENT,
--  `fk_userTypeID` INT NOT NULL,
--  `name` VARCHAR(45) NOT NULL,
--  `email` VARCHAR(100) NOT NULL,
--  `userName` VARCHAR(45) NULL,
--  `password` VARCHAR(100) NOT NULL,
--  `fk_cityID` INT NULL,
--  `createdDate` DATETIME NOT NULL DEFAULT NOW(),
--  `modifiedDate` DATETIME NOT NULL DEFAULT NOW(),
--  PRIMARY KEY (`pk_userID`),
--  INDEX `fk_tbl_UserMaster_1_idx` (`fk_userTypeID` ASC),
--  CONSTRAINT `fk_tbl_UserMaster_1`
--    FOREIGN KEY (`fk_userTypeID`)
--    REFERENCES `tbl_UserTypeMaster` (`pk_userTypeID`)
--    ON DELETE NO ACTION
--    ON UPDATE NO ACTION)
-- ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tbl_EmployeeMaster`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tbl_EmployeeMaster` (
  `pk_empID` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL,
  `DOB` DATE NOT NULL,
  `DOJ` DATE DEFAULT NULL,
  `gender` TINYINT(1) DEFAULT 0,
  `fk_cityID` INT  NULL,
  `address1` VARCHAR(100),
  `address2` VARCHAR(100),
  `cityName` VARCHAR(45),
  `stateName` VARCHAR(45),
  `pincode` VARCHAR(10),
  `isActive` TINYINT(1) NOT NULL DEFAULT 1,
  `createdDate` DATETIME NOT NULL DEFAULT NOW(),
  `modifiedDate` DATETIME NOT NULL DEFAULT NOW(),
  `isDeleted` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`pk_empID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tbl_LeaveMaster`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tbl_LeaveMaster` (
  `pk_leaveID` INT NOT NULL AUTO_INCREMENT,
  `leaveName` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  `isActive` TINYINT(1) NOT NULL DEFAULT 1,
  `isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`pk_leaveID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tbl_EmployeeLeaveEligibilityMapping`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tbl_EmployeeLeaveEligibilityMapping` (
  `pk_empLeaveID` INT NOT NULL AUTO_INCREMENT,
  `fk_empID` INT NOT NULL,
  `fk_leaveID` INT NOT NULL,
  PRIMARY KEY (`pk_empLeaveID`),
  INDEX `fk_tbl_EmployeeLeaveEligibilityMapping_2_idx` (`fk_leaveID` ASC),
  INDEX `fk_tbl_EmployeeLeaveEligibilityMapping_1_idx` (`fk_empID` ASC),
  CONSTRAINT `fk_tbl_EmployeeLeaveEligibilityMapping_1`
    FOREIGN KEY (`fk_empID`)
    REFERENCES `tbl_EmployeeMaster` (`pk_empID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_EmployeeLeaveEligibilityMapping_2`
    FOREIGN KEY (`fk_leaveID`)
    REFERENCES `tbl_LeaveMaster` (`pk_leaveID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tbl_EmployeeLeaveMapping`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tbl_EmployeeLeaveMapping` (
  `pk_empLeaveMapping` INT NOT NULL AUTO_INCREMENT,
  `fk_empID` INT NOT NULL,
  `fk_leaveID` INT NOT NULL,
  `fromDate` DATE NOT NULL,
  `toDate` DATE NOT NULL,
  `fk_userID` INT NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`pk_empLeaveMapping`),
  INDEX `fk_tbl_EmployeeLeaveMapping_1_idx` (`fk_empID` ASC),
  INDEX `fk_tbl_EmployeeLeaveMapping_2_idx` (`fk_leaveID` ASC),
  INDEX `fk_tbl_EmployeeLeaveMapping_3_idx` (`fk_userID` ASC),
  CONSTRAINT `fk_tbl_EmployeeLeaveMapping_1`
    FOREIGN KEY (`fk_empID`)
    REFERENCES `tbl_EmployeeMaster` (`pk_empID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_EmployeeLeaveMapping_2`
    FOREIGN KEY (`fk_leaveID`)
    REFERENCES `tbl_LeaveMaster` (`pk_leaveID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_EmployeeLeaveMapping_3`
    FOREIGN KEY (`fk_userID`)
    REFERENCES `tbl_UserMaster` (`pk_userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE `tbl_LocationMaster` (
  `pk_locationId` INT NOT NULL AUTO_INCREMENT,
  `empId` INT NOT NULL,
  `DOJ` DATE NULL,
  `employeeId` VARCHAR(45) NOT NULL,
  `locationEmail` VARCHAR(100) NULL,
  `_12MonthHours` INT NULL,
  `address` VARCHAR(100) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `pincode` VARCHAR(45) NULL,
  PRIMARY KEY (`pk_locationId`));

CREATE TABLE `tbl_LeaveInfo` (
  `pk_leaveInfoId` INT NOT NULL AUTO_INCREMENT,
  `empId` INT NOT NULL,
  `leaveReason` VARCHAR(100) NULL,
  `familyFirst` VARCHAR(45) NULL,
  `familyLast` VARCHAR(45) NULL,
  `familyMemberDOB` DATE NULL,
  `familyRelation` VARCHAR(45) NULL,
  `inLocoParent` VARCHAR(45) NULL,
  `providerName` VARCHAR(45) NULL,
  `providerType` VARCHAR(45) NULL,
  `providePhone` VARCHAR(45) NULL,
  `provideFax` VARCHAR(45) NULL,
  `provideAddress` VARCHAR(100) NULL,
  `startDate` DATE NULL,
  `endDate` DATE NULL,
  `leaveType` VARCHAR(45) NULL,
  PRIMARY KEY (`pk_leaveInfoId`));

CREATE TABLE `tbl_EmployeeLeave` (
    `pk_employeeLeaveID` INT NOT NULL AUTO_INCREMENT,
    `empId` INT NULL,
    `leaveId` INT NULL,
    `leave_name` VARCHAR(100) NULL,
    `state` VARCHAR(45) NULL,
    `eligibility` TEXT NULL,
    `qualifying_reason` TEXT NULL,
    `leave_type` TEXT NULL,
    `maximum_duration` TEXT NULL,
    `from_date` DATE NULL,
    `to_date` DATE NULL,
PRIMARY KEY (`pk_employeeLeaveID`));



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

