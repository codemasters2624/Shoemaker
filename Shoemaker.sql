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
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `belt` */

insert  into `belt`(`bid`,`b_name`,`b_type`,`size`,`color`,`price`,`buckle_type`,`total_quantity`,`available`) values 
(100,'Armani','Casual','L','Brown',10000,'Steel',2500,100),
(101,'Prada','Luxury','M','Brown',20000,'Silver',500,499),
(112,'Gucci','Casual','L','Brown',20010,'Metal',200,100),
(113,'Gucci','Casual','L','Brown',20010,'Metal',200,100),
(114,'Gucci','Casual','L','Brown',20010,'Metal',200,100),
(115,'Gucci','Casual','L','Brown',20010,'Metal',200,100);

/*Table structure for table `shoes` */

DROP TABLE IF EXISTS `shoes`;

CREATE TABLE `shoes` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `s_name` varchar(20) DEFAULT NULL,
  `s_type` varchar(20) DEFAULT NULL,
  `size` int unsigned DEFAULT NULL,
  `color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `price` double unsigned DEFAULT NULL,
  `is_special` char(1) DEFAULT NULL,
  `bid` int unsigned DEFAULT NULL,
  `available` int unsigned DEFAULT NULL,
  `total_quantity` int unsigned DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `shoes` */

insert  into `shoes`(`sid`,`s_name`,`s_type`,`size`,`color`,`price`,`is_special`,`bid`,`available`,`total_quantity`) values 
(101,'Gucci','Joggers',20,'Purple',50000,'N',NULL,200,3000),
(102,'Reebok Xpendables','Joggers',40,'Bluish Orange',23000,'N',NULL,3000,3000),
(103,'Reebok Xpendables','Joggers',40,'Bluish Orange',23000,'N',NULL,3000,4000),
(104,'Rimba','Loafers',38,'Red',25000,'N',NULL,20,20),
(105,'Nike','Joggers',24,'White',20000,'Y',102,200,200);

/* Procedure structure for procedure `sp_add_belt` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_add_belt` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_belt`(
p_b_name varchar(20),
p_b_type varchar(20),
p_size char(1),
p_color varchar(20),
p_price double unsigned,
p_buckle_type varchar(20),
p_available int unsigned,
p_total_quantity int unsigned
)
BEGIN
insert into belt (
b_name,
b_type,
size,
color,
price,
buckle_type,
available,
total_quantity)
values
(
p_b_name,
p_b_type,
p_size,
p_color,
p_price,
p_buckle_type,
p_available,
p_total_quantity
);
END */$$
DELIMITER ;

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

/* Procedure structure for procedure `sp_delete_belt` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_delete_belt` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_belt`(p_bid int unsigned)
BEGIN
	delete from belt where bid = p_bid;
	END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_delete_shoes` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_delete_shoes` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_shoes`(p_sid int unsigned)
BEGIN
	delete from shoes where sid = p_sid;
	END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_find_belt` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_find_belt` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_find_belt`(p_string varchar(20))
BEGIN
SELECT * FROM belt WHERE b_name LIKE CONCAT('%',p_string,'%');
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_find_shoes` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_find_shoes` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_find_shoes`(p_string varchar(20))
BEGIN
SELECT * FROM shoes WHERE s_name LIKE CONCAT('%',p_string,'%');
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_purchase_belt` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_purchase_belt` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_purchase_belt`(p_bid INT UNSIGNED, p_quantity INT UNSIGNED)
BEGIN
SELECT @counter := available FROM belt where bid = p_bid;
	UPDATE belt
	
    SET available = @counter- p_quantity
    WHERE bid = p_bid;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_purchase_shoes` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_purchase_shoes` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_purchase_shoes`(p_sid int unsigned, p_quantity int unsigned)
BEGIN
    select @counter := available from shoes where sid = p_sid;
    UPDATE shoes
    SET available = @counter - p_quantity
    WHERE sid = p_sid;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_show_belt` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_show_belt` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_show_belt`(p_bid varchar(10))
BEGIN
IF(p_bid IS null)
THEN
SELECT * FROM belt;
ELSE
SELECT * from belt where bid = p_bid;
END IF;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_show_shoes` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_show_shoes` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_show_shoes`(p_sid varchar(10))
BEGIN
IF(p_sid IS null)
THEN
SELECT * FROM shoes;
ELSE
SELECT * from shoes where sid = p_sid;
END IF;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_update_belt` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_update_belt` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_belt`(
			p_bid INT UNSIGNED,
			p_b_name VARCHAR(100),
			p_b_type VARCHAR(100),
			p_size char(1),
			p_color VARCHAR(100),
			p_buckle_type VARCHAR(100),
			p_price DOUBLE UNSIGNED,
			p_available INT UNSIGNED,
			p_total_quantity INT UNSIGNED)
BEGIN
	UPDATE belt
	SET
	 
	 b_name = p_b_name,
	 b_type = p_b_type,
	 size = p_size,
	 color = p_color,
 	 price = p_price,
	 buckle_type = p_buckle_type,
	 available = p_available,
	 total_quantity = p_total_quantity
	 WHERE
	 bid = p_bid;
	END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_update_shoes` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_update_shoes` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_shoes`(
			p_sid int unsigned,
			p_s_name varchar(100),
			p_s_type varchar(100),
			p_size int unsigned,
			p_color varchar(100),
			p_price double unsigned,
			p_bid int unsigned,
			p_is_special char(1),
			p_available int unsigned,
			p_total_quantity int unsigned
			)
BEGIN
	update shoes
	set
	 
	 s_name = p_s_name,
	 s_type = p_s_type,
	 size = p_size,
	 color = p_color,
 	 price = p_price,
	 bid = p_bid,
	 is_special = p_is_special,
	 available = p_available,
	 total_quantity = p_total_quantity
	 where
	 sid = p_sid;
	END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
