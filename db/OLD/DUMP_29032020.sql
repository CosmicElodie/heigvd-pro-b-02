-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 185.172.103.254    Database: DEV
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` mediumtext,
  `is_competitve` tinyint NOT NULL,
  `difficulty` int DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `attendees_min` int DEFAULT NULL,
  `attendees_max` int DEFAULT NULL,
  `deadline_reservation` datetime DEFAULT NULL,
  `created` datetime NOT NULL,
  `date_begin` datetime DEFAULT NULL,
  `date_end` datetime DEFAULT NULL,
  `location` mediumtext,
  `user_id` int NOT NULL,
  PRIMARY KEY (`event_id`),
  KEY `event_user_idx` (`user_id`),
  CONSTRAINT `event_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum_post`
--

DROP TABLE IF EXISTS `forum_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum_post` (
  `forum_post_id` int NOT NULL AUTO_INCREMENT,
  `message` longtext NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` datetime DEFAULT NULL,
  `forum_subject_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`forum_post_id`),
  KEY `fkForumSubject_idx` (`forum_subject_id`),
  KEY `fkUserPost_idx` (`user_id`),
  CONSTRAINT `fkForumSub` FOREIGN KEY (`forum_subject_id`) REFERENCES `forum_subject` (`forum_subject_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fkUserPost2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_post`
--

LOCK TABLES `forum_post` WRITE;
/*!40000 ALTER TABLE `forum_post` DISABLE KEYS */;
INSERT INTO `forum_post` VALUES (1,'Bonjour, je suis contente','2020-03-17 17:50:42','2020-03-17 17:50:42',5,1),(2,'Tralala','2020-03-17 16:58:00','2020-03-17 17:50:42',8,1);
/*!40000 ALTER TABLE `forum_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum_section`
--

DROP TABLE IF EXISTS `forum_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum_section` (
  `forum_section_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` mediumtext,
  `parent_forum_section_id` int DEFAULT NULL,
  `house_id` int DEFAULT NULL,
  PRIMARY KEY (`forum_section_id`),
  KEY `fkParentForumSection_idx` (`parent_forum_section_id`),
  KEY `fkHouse_idx` (`house_id`),
  CONSTRAINT `fkHouse` FOREIGN KEY (`house_id`) REFERENCES `house` (`house_id`),
  CONSTRAINT `fkParentForumSec` FOREIGN KEY (`parent_forum_section_id`) REFERENCES `forum_section` (`forum_section_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_section`
--

LOCK TABLES `forum_section` WRITE;
/*!40000 ALTER TABLE `forum_section` DISABLE KEYS */;
INSERT INTO `forum_section` VALUES (5,'Général','Lorem ipsum dolor sit ames',NULL,NULL),(6,'Discussion','Donec venenatis ligula et nunc facilisis',5,NULL),(7,'Sous Terst','sdfsdfsdf',6,NULL);
/*!40000 ALTER TABLE `forum_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum_subject`
--

DROP TABLE IF EXISTS `forum_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum_subject` (
  `forum_subject_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `forum_section_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`forum_subject_id`),
  KEY `fkForumSection_idx` (`forum_section_id`),
  KEY `fkUser_idx` (`user_id`),
  CONSTRAINT `fkForumSection3` FOREIGN KEY (`forum_section_id`) REFERENCES `forum_section` (`forum_section_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fkUser2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_subject`
--

LOCK TABLES `forum_subject` WRITE;
/*!40000 ALTER TABLE `forum_subject` DISABLE KEYS */;
INSERT INTO `forum_subject` VALUES (5,'Bla','2020-03-17 17:50:42',5,1),(8,'Mama','2020-03-17 17:50:42',6,1);
/*!40000 ALTER TABLE `forum_subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (1),(1);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `house`
--

DROP TABLE IF EXISTS `house`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `house` (
  `house_id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `shortname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`house_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `house`
--

LOCK TABLES `house` WRITE;
/*!40000 ALTER TABLE `house` DISABLE KEYS */;
INSERT INTO `house` VALUES (1,'Systèmes informatiques embarqués','IE'),(2,'Sécurité informatique','TS'),(3,'Réseaux et systèmes','TR'),(4,'Informatique logicielle','IL'),(5,'Ingénierie des données','ID');
/*!40000 ALTER TABLE `house` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `points_difficulty`
--

DROP TABLE IF EXISTS `points_difficulty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `points_difficulty` (
  `points_difficulty_id` int NOT NULL AUTO_INCREMENT,
  `difficulty` int DEFAULT NULL,
  `ranking` int DEFAULT NULL,
  `points` int DEFAULT NULL,
  PRIMARY KEY (`points_difficulty_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `points_difficulty`
--

LOCK TABLES `points_difficulty` WRITE;
/*!40000 ALTER TABLE `points_difficulty` DISABLE KEYS */;
/*!40000 ALTER TABLE `points_difficulty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `points_log`
--

DROP TABLE IF EXISTS `points_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `points_log` (
  `points_log_id` int NOT NULL AUTO_INCREMENT,
  `points` int NOT NULL,
  `description` mediumtext,
  `date` datetime NOT NULL,
  `is_from_event` tinyint NOT NULL,
  `user_id` int NOT NULL,
  `forum_post_id` int DEFAULT NULL,
  `event_id` int DEFAULT NULL,
  PRIMARY KEY (`points_log_id`),
  KEY `fkUser3_idx` (`user_id`),
  KEY `fkForumPost2_idx` (`forum_post_id`),
  KEY `fkEvent2_idx` (`event_id`),
  CONSTRAINT `fkEvent2_idx` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `fkForumPost2_idx` FOREIGN KEY (`forum_post_id`) REFERENCES `forum_post` (`forum_post_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `fkUser3_idx` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `points_log`
--

LOCK TABLES `points_log` WRITE;
/*!40000 ALTER TABLE `points_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `points_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `priority` int DEFAULT '0',
  `id` int NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'basic',0,0);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `status_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `active` int DEFAULT NULL,
  `birth` datetime DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `initials` varchar(255) DEFAULT NULL,
  `last_online` datetime DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `status_id` int DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `house_id` int DEFAULT NULL,
  `house_house_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FKleet9ikwn36n2m1l5ndf2fpbe` (`house_id`) /*!80000 INVISIBLE */,
  KEY `fkRole_idx` (`role_id`),
  KEY `fkStat_idx` (`status_id`),
  KEY `FKiqiea1ut18wghbi85sv599nbg` (`house_house_id`),
  CONSTRAINT `FKiqiea1ut18wghbi85sv599nbg` FOREIGN KEY (`house_house_id`) REFERENCES `house` (`house_id`),
  CONSTRAINT `FKleet9ikwn36n2m1l5ndf2fpbe` FOREIGN KEY (`house_id`) REFERENCES `house` (`house_id`),
  CONSTRAINT `fkRole` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'1986-07-29 17:23:16',NULL,'stefan.teofanovic@heig-vd.ch','Stefan','ST','2020-03-17 17:24:02','Teofanovic','testtest',1,1,'Ovich',NULL,NULL),(2,1,'1993-08-09 08:37:47',NULL,'michael.triponez@heig-vd.ch','Michael','MT',NULL,'Triponez','test',1,1,'Mich',NULL,NULL),(3,2,'2020-03-19 08:16:19','2020-03-19 08:16:21','tst','tester','Tst','2020-03-19 08:16:56','To delete','tst',1,1,'MrDelete',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_participate_event`
--

DROP TABLE IF EXISTS `user_participate_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_participate_event` (
  `user_id` int NOT NULL,
  `event_id` int NOT NULL,
  KEY `fkUserParticipate` (`user_id`),
  KEY `fkEventsParticipate` (`event_id`),
  CONSTRAINT `fkEventParticipate` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`),
  CONSTRAINT `fkUserParticipate` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_participate_event`
--

LOCK TABLES `user_participate_event` WRITE;
/*!40000 ALTER TABLE `user_participate_event` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_participate_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  KEY `FKlhhbknkqrbbja7jt6ao2vluhx` (`role_id`),
  KEY `FK40cm955hgg5oxf1oax8mqw0c4` (`user_id`),
  CONSTRAINT `fkRole2` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  CONSTRAINT `fkUser` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,1);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  KEY `FKlhhbknkqrbbja7jt6ao2vluhx` (`role_id`),
  KEY `FK40cm955hgg5oxf1oax8mqw0c4` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'DEV'
--

--
-- Dumping routines for database 'DEV'
--
/*!50003 DROP FUNCTION IF EXISTS `getForumChildrenJSON` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `getForumChildrenJSON`(v_id_parent INT) RETURNS json
    DETERMINISTIC
BEGIN

RETURN (SELECT CONCAT("[", GROUP_CONCAT(JSON_OBJECT( 
        'id_forum_section', id_forum_section, 
        'name', name, 
        'description', description, 
        'parent_id_forum_section', parent_id_forum_section )), "]")
    FROM forum_section
    WHERE parent_id_forum_section = v_id_parent);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getForumJSON` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `getForumJSON`(v_idForum INT) RETURNS json
    DETERMINISTIC
BEGIN

RETURN (SELECT JSON_OBJECT(
        'id_forum_section', id_forum_section, 
        'name', name, 
        'description', description, 
        'parent_id_forum_section', parent_id_forum_section )
    FROM forum_section
    WHERE id_forum_section = v_idForum);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `listForum` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `listForum`()
proc: BEGIN
	DECLARE v_forums_root JSON DEFAULT
    (SELECT CONCAT("[", GROUP_CONCAT(getForumJSON(id_forum_Section)), "]")
    FROM forum_section
    WHERE parent_id_forum_section IS NULL);
    
    DECLARE v_number_forums INT DEFAULT JSON_LENGTH(v_forums_root);
    DECLARE v_i INT DEFAULT 0;
    DECLARE v_forum_children JSON;
    
    WHILE v_i < v_number_forums DO
        SELECT JSON_EXTRACT(v_forums_root, CONCAT('$[',v_i,'].id_forum_section'));
        
        LEAVE proc;
        -- IF JSON_UNQUOTE(JSON_EXTRACT(v_player_row, '$.owner')) = 1 THEN
           -- SET v_owner_id = JSON_UNQUOTE(JSON_EXTRACT(v_player_row, '$.id'));
        -- END IF;
        
        SET v_i = v_i + 1;
    END WHILE;
    
    SELECT v_forums_root;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `new_procedure` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `new_procedure`()
BEGIN
	SELECT id_user FROM user;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-29 19:14:00
