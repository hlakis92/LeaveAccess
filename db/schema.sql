CREATE DATABASE leave_access;

CREATE TABLE `tbl_UserMaster` (
  `pk_userID` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`pk_userID`));


INSERT INTO `tbl_UserMaster` (`email`, `password`) VALUES ('admin@gmail.com', '202cb962ac59075b964b07152d234b70');
INSERT INTO `tbl_UserMaster` (`email`, `password`) VALUES ('supervisor@gmail.com', '202cb962ac59075b964b07152d234b70');
