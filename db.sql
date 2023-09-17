-- MariaDB dump 10.19  Distrib 10.11.3-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: bbikes
-- ------------------------------------------------------
-- Server version	10.11.3-MariaDB-1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `maps`
--

DROP TABLE IF EXISTS `maps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(30) DEFAULT NULL,
  `level` char(1) DEFAULT NULL,
  `length` float DEFAULT NULL,
  `tilt` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maps`
--

LOCK TABLES `maps` WRITE;
/*!40000 ALTER TABLE `maps` DISABLE KEYS */;
INSERT INTO `maps` VALUES
(5,'Stefanka','1',0.86,4.9),
(6,'Cyganka','1',1.65,4),
(7,'Twister','2',4.4,6.2),
(8,'RockNRolla','2',6.2,7.1),
(9,'Stary Zielony','3',2.2,11.8),
(10,'Cygan','3',2.6,11.8),
(11,'Gondola','3',2.2,11.8),
(12,'Dębowiec','3',2.2,12.5),
(13,'Sahaira','3',1.74,11.2),
(14,'Dziabar','3',1.3,16.1),
(15,'Kamieniołom','3',1.8,13.8),
(16,'DH+','3',2,13.5),
(17,'Daglezjowy','3',4.6,6.5);
/*!40000 ALTER TABLE `maps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `times`
--

DROP TABLE IF EXISTS `times`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `times` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `times`
--

LOCK TABLES `times` WRITE;
/*!40000 ALTER TABLE `times` DISABLE KEYS */;
/*!40000 ALTER TABLE `times` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` char(40) DEFAULT NULL,
  `password` char(64) DEFAULT NULL,
  `email` char(90) DEFAULT NULL,
  `apikey` char(64) DEFAULT NULL,
  `privileges` int(11) DEFAULT NULL,
  `current` int(11) DEFAULT NULL,
  `points` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `current` (`current`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`current`) REFERENCES `maps` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'uwu','43cae2eafda4d7a9b31768c8a6f086d7942e97d3a96c75326b3a1f4b17b1cffd','cixolaptop@gmail.com','45465e081c8c082123a19bbe7d5b06fbd573164148573c48fb6398fb4d31f844',0,NULL,4),
(2,'uwu','43cae2eafda4d7a9b31768c8a6f086d7942e97d3a96c75326b3a1f4b17b1cffd','cixolaptop@gmail.com','7a32af66e4d01c74064c7f9165e1332969d7f2a53930ffb52d35f9e4ba475b30',0,NULL,4),
(3,'uwu','43cae2eafda4d7a9b31768c8a6f086d7942e97d3a96c75326b3a1f4b17b1cffd','cixolaptop@gmail.com','814cfa315a45dd8c7a56510873e49d37481a2208da0e5d7a97f66b22ce18a703',0,NULL,4),
(4,'uwu','43cae2eafda4d7a9b31768c8a6f086d7942e97d3a96c75326b3a1f4b17b1cffd','cixolaptop@gmail.com','325541ae544ac17a86b818f836bf062daa7e14263747362affa853fb92e95975',0,NULL,4),
(5,'test','9a900403ac313ba27a1bc81f0932652b8020dac92c234d98fa0b06bf0040ecfd','ijihjioj','b45ded9588d6469128c5e11fdeb7318445ec35b75123284825b33bf7678e17fd',0,NULL,4),
(6,'test2','15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225','u','a76bad25aba435268f9822f6f784fd6bfe2869f64be640e44aa3ad316fb2c545',0,NULL,10),
(7,'aww','15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225','uwu@gmail.com','f2d9d97cd4016bc0d0297a8f3bc685dfeab512aa407b62e4d8bec5b4d9e9e25a',NULL,NULL,10);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-17 15:34:11
