/*
SQLyog Professional v12.5.1 (64 bit)
MySQL - 8.0.21 : Database - shoemaker
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`shoemaker` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `shoemaker`;

/*Table structure for table `belt` */

DROP TABLE IF EXISTS `belt`;

CREATE TABLE `belt` (
  `bid` int unsigned NOT NULL AUTO_INCREMENT,
  `b_name` varchar(20) DEFAULT NULL,
  `b_type` varchar(20) DEFAULT NULL,
  `size` char(1) DEFAULT NULL,
  `color` varchar(10) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `buckle_type` varchar(20) DEFAULT NULL,
  `total_quantity` int unsigned DEFAULT NULL,
  `available` int unsigned DEFAULT NULL,
  PRIMARY KEY (`bid`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `belt` */

insert  into `belt`(`bid`,`b_name`,`b_type`,`size`,`color`,`price`,`buckle_type`,`total_quantity`,`available`) values 
(100,'Gucci','Premium','L','Black',1000,'Gold',NULL,NULL),
(101,'Prada','Luxury','M','Brown',20000,'Silver',NULL,NULL);

/*Table structure for table `shoes` */

DROP TABLE IF EXISTS `shoes`;

CREATE TABLE `shoes` (
  `SId` int NOT NULL AUTO_INCREMENT,
  `s_name` varchar(20) DEFAULT NULL,
  `s_type` varchar(20) DEFAULT NULL,
  `size` int unsigned DEFAULT NULL,
  `color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `price` double unsigned DEFAULT NULL,
  `bid` int unsigned DEFAULT NULL,
  `is_special` char(1) DEFAULT NULL,
  `available` int unsigned DEFAULT NULL,
  `total_quantity` int unsigned DEFAULT NULL,
  PRIMARY KEY (`SId`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `shoes` */

insert  into `shoes`(`SId`,`s_name`,`s_type`,`size`,`color`,`price`,`bid`,`is_special`,`available`,`total_quantity`) values 
(100,'Armani','Loafers',8,'Blue',20000,100,'Y',50,100),
(101,'Gucci','Joggers',20,'Purple',50000,NULL,'N',200,3000);

/* Procedure structure for procedure `sp_add_shoes` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_add_shoes` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_shoes`(
p_s_name varchar(20),
p_s_type varchar(20),
p_size int unsigned,
p_color varchar(20),
p_price double unsigned,
p_bid int unsigned,
p_is_special char(1),
p_available int unsigned,
p_total_quantity int unsigned
)
BEGIN
insert into shoes (s_name,
s_type,
size,
color,
price,
bid,
is_special,
available,
total_quantity)
values
(
p_s_name,
p_s_type,
p_size,
p_color,
p_price,
p_bid,
p_is_special,
p_available,
p_total_quantity
);

END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_show_belt` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_show_belt` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_show_belt`()
BEGIN
 Select * from belt;
 end */$$
DELIMITER ;

/* Procedure structure for procedure `sp_show_shoes` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_show_shoes` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_show_shoes`()
BEGIN
 Select * from shoes;
 end */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
