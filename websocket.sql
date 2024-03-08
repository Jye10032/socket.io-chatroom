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

insert  into `message`(`id`,`username`,`content`,`time`,`avatar`,`type`) values (1,'小贺','嘤嘤嘤，大家上午好','20/06/12 10:39','images/avatar05.jpg','html'),(2,'小美','泥萌好鸭<img class=\"emoji_icon\" src=\"lib/jquery-emoji/img/tieba/36.jpg\">','20/06/12 10:40','images/avatar02.jpg','html'),(3,'小王','各位，起的好早啊','20/06/12 10:40','images/avatar09.jpg','html'),(4,'小王','好想再睡会儿','20/06/12 10:40','images/avatar09.jpg','html'),(5,'小贺','太阳都晒屁股了','20/06/12 10:40','images/avatar05.jpg','html'),(6,'小贺','<img class=\"emoji_icon\" src=\"lib/jquery-emoji/img/tieba/40.jpg\"><img class=\"emoji_icon\" src=\"lib/jquery-emoji/img/tieba/40.jpg\"><img class=\"emoji_icon\" src=\"lib/jquery-emoji/img/tieba/40.jpg\">','20/06/12 10:40','images/avatar05.jpg','html'),(7,'小美','就是就是','20/06/12 10:41','images/avatar02.jpg','html'),(8,'小王','那我起床学习了','20/06/12 10:41','images/avatar09.jpg','html'),(9,'小王','今天又是充实的一天~','20/06/12 10:41','images/avatar09.jpg','html'),(10,'小美','嘻嘻嘻','20/06/12 10:42','images/avatar02.jpg','html'),(11,'小贺','哈哈哈','20/06/12 12:04','images/avatar05.jpg','html'),(12,'小王','哈哈','20/06/12 12:10','images/avatar09.jpg','html'),(13,'小王','xixi','20/06/12 12:13','images/avatar09.jpg','html'),(14,'小王','呱呱','20/06/12 12:16','images/avatar09.jpg','html'),(15,'小美','<div>中午了 我的课程设计做的差不多了吃饭去了</div><div><br></div>','20/06/12 12:48','images/avatar02.jpg','html'),(16,'小贺','好滴 我也吃饭去了','20/06/12 12:48','images/avatar05.jpg','html'),(17,'小贺','吃完饭了哒哒','20/06/12 13:30','images/avatar05.jpg','html'),(18,'小美','<div>我也吃完了</div><div><br></div>','20/06/12 13:30','images/avatar02.jpg','html'),(19,'小王','<img class=\"emoji_icon\" src=\"lib/jquery-emoji/img/tieba/2.jpg\">','20/06/12 19:02','images/avatar09.jpg','html');

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

-- insert  into `usersinformation`(`username`,`password`,`avatar`) values ('小刘','woshixiaoliu','images/avatar06.jpg'),('小张','woshixiaozhang','male','images/avatar08.jpg'),('小楚','woshixiaochu','male','images/avatar10.jpg'),('小王','woshixiaowang','male','images/avatar09.jpg'),('小美','woshixiaomei','female','images/avatar02.jpg'),('小贺','0415','male','images/avatar05.jpg'),('晓晓','woshixiaoxiao','female','images/avatar06.jpg');
insert into `usersinformation`(`username`,`password`,`avatar`) values ('admin','123456','images/avatar01.jpg');
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
