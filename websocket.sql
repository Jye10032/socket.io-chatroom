/*
SQLyog Ultimate v8.32 
MySQL - 8.0.11 : Database - websocket
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`websocket` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `websocket`;

/*Table structure for table `message` */

DROP TABLE IF EXISTS `message`;

CREATE TABLE `message` (
  `id` int(20) NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `content` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci,
  `time` varchar(20) DEFAULT NULL,
  `avatar` varchar(20) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_message` (`username`),
  CONSTRAINT `FK_message` FOREIGN KEY (`username`) REFERENCES `usersinformation` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `message` */

insert  into `message`(`id`,`username`,`content`,`time`,`avatar`,`type`) values 
(1,'Tom','test','24/3/9 13:26','images/avatar02.webp','html'),
(2,'Bob','<img src="js/jquery-emoji/src/img/emoji/1.png">','24/3/9 13:28','images/avatar05.webp','html');

/*Table structure for table `usersinformation` */

DROP TABLE IF EXISTS `usersinformation`;

CREATE TABLE `usersinformation` (
  `username` varchar(20) NOT NULL,
  `password` varchar(20) DEFAULT NULL,
  `avatar` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- CREATE TABLE `usersinformation` (
--   `username` varchar(20) NOT NULL,
--   `password` varchar(20) DEFAULT NULL,
--   `sex` varchar(10) DEFAULT NULL,
--   `avatar` varchar(30) DEFAULT NULL,
--   PRIMARY KEY (`username`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `usersinformation` */

-- insert  into `usersinformation`(`username`,`password`,`avatar`) values ('小刘','woshixiaoliu','images/avatar06.webp'),('小张','woshixiaozhang','male','images/avatar08.webp'),('小楚','woshixiaochu','male','images/avatar10.webp'),('小王','woshixiaowang','male','images/avatar09.webp'),('小美','woshixiaomei','female','images/avatar02.webp'),('小贺','0415','male','images/avatar05.webp'),('晓晓','woshixiaoxiao','female','images/avatar06.webp');
insert into `usersinformation`(`username`,`password`,`avatar`) values ('admin','123456','images/avatar01.webp');
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
