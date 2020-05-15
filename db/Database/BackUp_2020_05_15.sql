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
-- Table structure for table `SPRING_SESSION`
--

DROP TABLE IF EXISTS `SPRING_SESSION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SPRING_SESSION` (
  `PRIMARY_ID` char(36) NOT NULL,
  `SESSION_ID` char(36) NOT NULL,
  `CREATION_TIME` bigint NOT NULL,
  `LAST_ACCESS_TIME` bigint NOT NULL,
  `MAX_INACTIVE_INTERVAL` int NOT NULL,
  `EXPIRY_TIME` bigint NOT NULL,
  `PRINCIPAL_NAME` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`PRIMARY_ID`),
  UNIQUE KEY `SPRING_SESSION_IX1` (`SESSION_ID`),
  KEY `SPRING_SESSION_IX2` (`EXPIRY_TIME`),
  KEY `SPRING_SESSION_IX3` (`PRINCIPAL_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SPRING_SESSION`
--

LOCK TABLES `SPRING_SESSION` WRITE;
/*!40000 ALTER TABLE `SPRING_SESSION` DISABLE KEYS */;
INSERT INTO `SPRING_SESSION` VALUES ('6c646ecf-17b3-49e5-aa7c-0adadc217603','7c8f53db-488e-438c-ba0d-8094d10108ce',1589539788530,1589540030013,1800,1589541830013,'michael.triponez@heig-vd.ch'),('9da0ed8d-4550-4437-b660-3a2cb962e95b','80c0b47d-4093-40c8-9770-c5c95a796bbe',1589538548231,1589539217459,1800,1589541017459,'elodie.lagier@heig-vd.ch'),('d6f83513-df73-4b4c-b440-128d27dcab4d','dd17da3b-68f7-4b28-b919-8d828851bd56',1589536683486,1589539433652,1800,1589541233652,NULL);
/*!40000 ALTER TABLE `SPRING_SESSION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SPRING_SESSION_ATTRIBUTES`
--

DROP TABLE IF EXISTS `SPRING_SESSION_ATTRIBUTES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SPRING_SESSION_ATTRIBUTES` (
  `SESSION_PRIMARY_ID` char(36) NOT NULL,
  `ATTRIBUTE_NAME` varchar(200) NOT NULL,
  `ATTRIBUTE_BYTES` blob NOT NULL,
  PRIMARY KEY (`SESSION_PRIMARY_ID`,`ATTRIBUTE_NAME`),
  KEY `SPRING_SESSION_ATTRIBUTES_IX1` (`SESSION_PRIMARY_ID`),
  CONSTRAINT `SPRING_SESSION_ATTRIBUTES_FK` FOREIGN KEY (`SESSION_PRIMARY_ID`) REFERENCES `SPRING_SESSION` (`PRIMARY_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SPRING_SESSION_ATTRIBUTES`
--

LOCK TABLES `SPRING_SESSION_ATTRIBUTES` WRITE;
/*!40000 ALTER TABLE `SPRING_SESSION_ATTRIBUTES` DISABLE KEYS */;
INSERT INTO `SPRING_SESSION_ATTRIBUTES` VALUES ('6c646ecf-17b3-49e5-aa7c-0adadc217603','SPRING_SECURITY_CONTEXT',_binary '¬\í\0sr\0=org.springframework.security.core.context.SecurityContextImpl\0\0\0\0\0\0\0L\0authenticationt\02Lorg/springframework/security/core/Authentication;xpsr\0Oorg.springframework.security.authentication.UsernamePasswordAuthenticationToken\0\0\0\0\0\0\0L\0credentialst\0Ljava/lang/Object;L\0	principalq\0~\0xr\0Gorg.springframework.security.authentication.AbstractAuthenticationTokenÓª(~nGd\0Z\0\rauthenticatedL\0authoritiest\0Ljava/util/Collection;L\0detailsq\0~\0xpsr\0&java.util.Collections$UnmodifiableListü%1µ\ìŽ\0L\0listt\0Ljava/util/List;xr\0,java.util.Collections$UnmodifiableCollectionB\0€\Ë^÷\0L\0cq\0~\0xpsr\0java.util.ArrayListx\Ò™\Ça\0I\0sizexp\0\0\0\0w\0\0\0\0xq\0~\0\rppsr\0models.UserSƒù\'A\Ì\Í\0I\0access_levelI\0activeI\0idI\0role_idI\0	status_idL\0avatart\0Ljava/lang/String;L\0birtht\0Ljava/util/Date;L\0createdq\0~\0L\0emailq\0~\0L\0	firstnameq\0~\0L\0houset\0Lmodels/House;L\0last_onlineq\0~\0L\0lastnameq\0~\0L\0passwordq\0~\0L\0rolesq\0~\0	xp\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0t\0*http://localhost:8080/content/Triponez.pngsr\0java.sql.Timestamp&\Õ\ÈS¿e\0I\0nanosxr\0java.util.DatehjKYt\0\0xpw\0\0\0­lZO\0x\0\0\0\0pt\0michael.triponez@heig-vd.cht\0Michaelsr\0models.HouseP\ä[™\'J\0I\0idL\0avatarq\0~\0L\0nameq\0~\0L\0	shortnameq\0~\0xp\0\0\0pt\0SÃ©curitÃ© informatiquet\0TSpt\0Triponezt\0testsr\0/org.hibernate.collection.internal.PersistentBagþWÅ¯\ÚO¦D\0L\0bagq\0~\0	L\0providedCollectionq\0~\0xr\0>org.hibernate.collection.internal.AbstractPersistentCollectionW·]ŠºsT\0Z\0allowLoadOutsideTransactionI\0\ncachedSizeZ\0dirtyZ\0elementRemovedZ\0initializedZ\0\risTempSessionL\0keyt\0Ljava/io/Serializable;L\0ownerq\0~\0L\0roleq\0~\0L\0sessionFactoryUuidq\0~\0L\0storedSnapshotq\0~\0!xp\0ÿÿÿÿ\0\0\0sr\0java.lang.Integerâ ¤÷‡8\0I\0valuexr\0java.lang.Number†¬•”\à‹\0\0xp\0\0\0q\0~\0t\0models.User.rolespsq\0~\0\0\0\0\0w\0\0\0\0xsq\0~\0\0\0\0\0w\0\0\0\0xp'),('9da0ed8d-4550-4437-b660-3a2cb962e95b','SPRING_SECURITY_CONTEXT',_binary '¬\í\0sr\0=org.springframework.security.core.context.SecurityContextImpl\0\0\0\0\0\0\0L\0authenticationt\02Lorg/springframework/security/core/Authentication;xpsr\0Oorg.springframework.security.authentication.UsernamePasswordAuthenticationToken\0\0\0\0\0\0\0L\0credentialst\0Ljava/lang/Object;L\0	principalq\0~\0xr\0Gorg.springframework.security.authentication.AbstractAuthenticationTokenÓª(~nGd\0Z\0\rauthenticatedL\0authoritiest\0Ljava/util/Collection;L\0detailsq\0~\0xpsr\0&java.util.Collections$UnmodifiableListü%1µ\ìŽ\0L\0listt\0Ljava/util/List;xr\0,java.util.Collections$UnmodifiableCollectionB\0€\Ë^÷\0L\0cq\0~\0xpsr\0java.util.ArrayListx\Ò™\Ça\0I\0sizexp\0\0\0\0w\0\0\0\0xq\0~\0\rppsr\0models.UserSƒù\'A\Ì\Í\0I\0access_levelI\0activeI\0idI\0role_idI\0	status_idL\0avatart\0Ljava/lang/String;L\0birtht\0Ljava/util/Date;L\0createdq\0~\0L\0emailq\0~\0L\0	firstnameq\0~\0L\0houset\0Lmodels/House;L\0last_onlineq\0~\0L\0lastnameq\0~\0L\0passwordq\0~\0L\0rolesq\0~\0	xp\0\0\0K\0\0\0\0\0\0\n\0\0\0\0\0\0t\0)http://localhost:8080/content/Lagier.jpegsr\0java.sql.Timestamp&\Õ\ÈS¿e\0I\0nanosxr\0java.util.DatehjKYt\0\0xpwÿÿþH¡\ã\0x\0\0\0\0sq\0~\0w\0\0qEˆNx\0\0\0\0t\0elodie.lagier@heig-vd.cht\0Elodiesr\0models.HouseP\ä[™\'J\0I\0idL\0avatarq\0~\0L\0nameq\0~\0L\0	shortnameq\0~\0xp\0\0\0pt\0IngÃ©nierie des donnÃ©est\0IDsq\0~\0w\0\0qEˆNx\0\0\0\0t\0Lagiert\0lolsr\0/org.hibernate.collection.internal.PersistentBagþWÅ¯\ÚO¦D\0L\0bagq\0~\0	L\0providedCollectionq\0~\0xr\0>org.hibernate.collection.internal.AbstractPersistentCollectionW·]ŠºsT\0Z\0allowLoadOutsideTransactionI\0\ncachedSizeZ\0dirtyZ\0elementRemovedZ\0initializedZ\0\risTempSessionL\0keyt\0Ljava/io/Serializable;L\0ownerq\0~\0L\0roleq\0~\0L\0sessionFactoryUuidq\0~\0L\0storedSnapshotq\0~\0#xp\0ÿÿÿÿ\0\0\0sr\0java.lang.Integerâ ¤÷‡8\0I\0valuexr\0java.lang.Number†¬•”\à‹\0\0xp\0\0\0\nq\0~\0t\0models.User.rolespsq\0~\0\0\0\0\0w\0\0\0\0xsq\0~\0\0\0\0\0w\0\0\0\0xp'),('d6f83513-df73-4b4c-b440-128d27dcab4d','SPRING_SECURITY_SAVED_REQUEST',_binary '¬\í\0sr\0Aorg.springframework.security.web.savedrequest.DefaultSavedRequest@HDù6d”\0I\0\nserverPortL\0contextPatht\0Ljava/lang/String;L\0cookiest\0Ljava/util/ArrayList;L\0headerst\0Ljava/util/Map;L\0localesq\0~\0L\0methodq\0~\0L\0\nparametersq\0~\0L\0pathInfoq\0~\0L\0queryStringq\0~\0L\0\nrequestURIq\0~\0L\0\nrequestURLq\0~\0L\0schemeq\0~\0L\0\nserverNameq\0~\0L\0servletPathq\0~\0xp\0\0t\0\0sr\0java.util.ArrayListx\Ò™\Ça\0I\0sizexp\0\0\0w\0\0\0sr\09org.springframework.security.web.savedrequest.SavedCookie@+‚ŸÀ´f\0I\0maxAgeZ\0secureI\0versionL\0commentq\0~\0L\0domainq\0~\0L\0nameq\0~\0L\0pathq\0~\0L\0valueq\0~\0xpÿÿÿÿ\0\0\0\0\0ppt\0SESSIONpt\00ZGQxN2RhM2ItNjhmNy00YjI4LWI5MTktOGQ4Mjg4NTFiZDU2xsr\0java.util.TreeMapÁö>-%j\æ\0L\0\ncomparatort\0Ljava/util/Comparator;xpsr\0*java.lang.String$CaseInsensitiveComparatorw\\}\\P\å\Î\0\0xpw\0\0\0\nt\0acceptsq\0~\0\0\0\0w\0\0\0t\0*/*xt\0accept-encodingsq\0~\0\0\0\0w\0\0\0t\0\rgzip, deflatext\0accept-languagesq\0~\0\0\0\0w\0\0\0t\0\Zfr-CH,en-US;q=0.7,en;q=0.3xt\0\rcache-controlsq\0~\0\0\0\0w\0\0\0t\0	max-age=0xt\0\nconnectionsq\0~\0\0\0\0w\0\0\0t\0\nkeep-alivext\0cookiesq\0~\0\0\0\0w\0\0\0t\08SESSION=ZGQxN2RhM2ItNjhmNy00YjI4LWI5MTktOGQ4Mjg4NTFiZDU2xt\0hostsq\0~\0\0\0\0w\0\0\0t\0localhost:8080xt\0originsq\0~\0\0\0\0w\0\0\0t\0http://localhost:3000xt\0referersq\0~\0\0\0\0w\0\0\0t\0#http://localhost:3000/event_welcomext\0\nuser-agentsq\0~\0\0\0\0w\0\0\0t\0NMozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0xxsq\0~\0\0\0\0w\0\0\0sr\0java.util.Locale~ø`œ0ù\ì\0I\0hashcodeL\0countryq\0~\0L\0\nextensionsq\0~\0L\0languageq\0~\0L\0scriptq\0~\0L\0variantq\0~\0xpÿÿÿÿt\0CHq\0~\0t\0frq\0~\0q\0~\0xsq\0~\00ÿÿÿÿt\0USq\0~\0t\0enq\0~\0q\0~\0xsq\0~\00ÿÿÿÿq\0~\0q\0~\0q\0~\06q\0~\0q\0~\0xxt\0GETsq\0~\0pw\0\0\0\0xppt\0\n/event/allt\0http://localhost:8080/event/allt\0httpt\0	localhostt\0\n/event/all');
/*!40000 ALTER TABLE `SPRING_SESSION_ATTRIBUTES` ENABLE KEYS */;
UNLOCK TABLES;

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
  `is_competitive` tinyint NOT NULL,
  `battleroyale` int DEFAULT NULL,
  `difficulty` int DEFAULT NULL,
  `status` varchar(45) DEFAULT 'En attente',
  `price` int DEFAULT NULL,
  `attendees_min` int DEFAULT NULL,
  `attendees_max` int DEFAULT NULL,
  `deadline_reservation` datetime DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_begin` datetime NOT NULL,
  `date_end` datetime NOT NULL,
  `location` mediumtext,
  `address` varchar(256) DEFAULT NULL,
  `user_id` int NOT NULL,
  `house_id` int DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `event_user_idx` (`user_id`),
  KEY `event_house_idx` (`house_id`),
  CONSTRAINT `event_house` FOREIGN KEY (`house_id`) REFERENCES `house` (`house_id`),
  CONSTRAINT `event_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'Test event','C\'est un test',1,NULL,1,'Testable',8,10,15,'2020-04-05 00:00:00','2020-04-05 00:00:00','2020-04-05 05:33:00','2020-04-05 00:00:00','G05b',NULL,2,NULL),(2,'Grillades TS','Une grillade pour tous !',1,NULL,NULL,'En cours',0,1,50,'2020-04-01 00:00:00','2020-04-01 00:00:00','2020-04-01 03:59:00','2020-04-01 00:00:00','Chill',NULL,5,2),(3,'Grillades ID','Une grillade pour tous !',0,NULL,NULL,'En cours',0,5,50,'2020-04-01 00:00:00','2020-04-01 00:00:00','2020-04-01 04:25:00','2020-04-01 00:00:00','Chill',NULL,5,5),(4,'Grillades IL','Une grillade pour tous !',0,NULL,NULL,'En cours',0,5,50,'2020-04-01 00:00:00','2020-04-01 00:00:00','2020-04-01 19:30:00','2020-04-01 00:00:00','Chill',NULL,5,4),(5,'CTF','C\'est chouette',1,1,3,NULL,0,5,30,'2020-04-10 00:00:00','2020-04-09 23:36:08','2020-04-15 21:20:00','2020-04-16 00:00:00','H01','Dans mon lit',2,3),(7,'Baleinev 2021','C\'est cool la musique',1,1,3,NULL,0,5,100,'2020-04-10 00:00:00','2020-04-09 23:37:03','2020-04-15 12:01:00','2020-04-16 00:00:00','En E01','HEIG-VD',2,NULL),(8,'Un Ã©vÃ©nement pour orientation anonyme','Je ne sais pas quel orientation c\'est',1,1,3,NULL,0,5,30,'2020-04-10 00:00:00','2020-04-09 23:38:32','2020-04-15 13:10:00','2020-04-16 00:00:00','En E01','HEIG-VD',2,1),(9,'Marathon sportif HEIG-VD','Vous allez suer!',1,NULL,4,'<null>',5,12,50,'2020-04-13 00:00:00','2020-04-10 08:42:12','2020-04-15 08:25:00','2020-04-15 19:30:00','Plage HEIG-VD','rue des sports 1',10,NULL),(10,'[Workshop ID] - How to make a sandwich','Tu veux apprendre Ã  rÃ©aliser le meilleur sandwich qui soit ? Alors participe Ã  notre workshop !',0,NULL,1,'<null>',10,2,20,'2020-04-13 00:00:00','2020-04-10 08:42:12','2020-04-15 08:25:00','2020-04-15 19:30:00','En H01','HEIG-VD',10,5),(11,'final test parce que lÃ  jpp','TT_TT MARRE',1,0,1,NULL,12,5,10,'2020-04-19 00:00:00','2020-04-18 02:02:20','2020-04-20 00:00:00','2020-04-21 00:00:00','HEIG','route de cheseaux 1, 1400 Yverdon',10,5),(22,'Jurassic Park Convention','Pour les trve people (*UwU)',0,NULL,1,NULL,45,2,42,'2020-04-19 00:00:00','2020-04-18 11:04:51','2020-04-20 00:00:00','2020-04-21 00:00:00','SwissTech Convention Center','Route de jinventeklÃ¨remen 9, 1602 Somewhere-Over-The-Rainbow',10,NULL),(23,'Koh Lanta HEIG Version','Pour les warriors de la HEIG-VD',1,NULL,4,NULL,150,10,50,'2020-04-21 00:00:00','2020-04-18 11:10:37','2020-04-24 00:00:00','2020-04-29 00:00:00','Koh Samui Hills','Avenue des palmiers 35A, 34507 Koh Samui',10,NULL),(25,'Club lecture ','let\'s read all the books !',0,NULL,1,'En cours',0,2,30,'2020-04-19 00:00:00','2020-04-18 12:19:36','2020-04-20 00:00:00','2020-04-21 00:00:00','Salle C23','route de cheseaux 1, 1400 Yverdon',10,NULL);
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
  `subject_answer` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`forum_post_id`),
  KEY `fkForumSubject_idx` (`forum_subject_id`),
  KEY `fkUserPost_idx` (`user_id`),
  CONSTRAINT `fkForumSub` FOREIGN KEY (`forum_subject_id`) REFERENCES `forum_subject` (`forum_subject_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fkUserPost2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=295 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_post`
--

LOCK TABLES `forum_post` WRITE;
/*!40000 ALTER TABLE `forum_post` DISABLE KEYS */;
INSERT INTO `forum_post` VALUES (271,'franchement bleu why not, comme Ã§a Ã§a ferait les couleurs des fringues de Sangoku','2020-04-20 14:52:53','2020-04-20 14:52:53',54,10,0),(272,'En faisant une intÃ©gration par partie avec u\'(x) = e^x et v(x) = cos(x). Tu remarqueras que tu devras faire une autre intÃ©gration par partie et tu te retrouveras au mÃªme point de dÃ©part avec ton intÃ©grale. Finalement, tu sais que c\'est deux fois cette intÃ©grale et tu diviseras par deux','2020-04-20 15:39:23','2020-04-20 15:39:23',60,5,0),(273,'Ouais peut-Ãªtre bien en vert','2020-04-22 09:43:07','2020-04-22 10:08:17',54,1,0),(275,'One reunion a day keep the doctor away !','2020-04-22 09:49:49','2020-04-22 09:49:49',58,10,0),(276,'Exact !','2020-04-22 10:08:41','2020-04-22 10:08:41',58,5,0),(278,'Telle est la question','2020-04-22 10:35:33','2020-04-22 10:35:33',59,5,0),(279,'Je partirai sur du rouge ! Comme le logo de l\'Ã©cole !','2020-04-22 12:43:09','2020-04-22 12:43:09',54,5,0),(281,'Dans les paramÃ¨tres du systÃ¨me de Workbench, il faut farfouiller dedans','2020-04-28 14:53:13','2020-04-28 14:53:13',62,4,0),(286,'Sinon tu peux le faire en ligne de commande','2020-04-28 16:01:40','2020-04-28 16:01:40',62,4,0),(287,'du noir !','2020-04-28 16:05:10','2020-04-28 16:05:10',54,4,0),(289,'SAUVONS NOTRE FACULTÃ‰','2020-04-28 17:01:58','2020-04-28 17:01:58',64,9,0),(290,'On a assurÃ© la prÃ©sentation de jeudi dernier','2020-04-28 17:24:29','2020-04-28 17:24:29',58,5,0);
/*!40000 ALTER TABLE `forum_post` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `after_insert_forum_post` AFTER INSERT ON `forum_post` FOR EACH ROW BEGIN
	DECLARE v_is_eligible BOOLEAN DEFAULT
    (SELECT COUNT(points_log_id) FROM points_log 
    WHERE date >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
    AND user_id = new.user_id
    AND (origin = "subject_participation" OR origin = "help_subject_participation")) = 0;
    
    DECLARE v_is_from_help_section BOOLEAN DEFAULT
    (SELECT help_section FROM forum_section
    INNER JOIN forum_subject USING (forum_section_id)
    INNER JOIN forum_post USING (forum_subject_id)
    WHERE forum_post_id = NEW.forum_post_id) = 1;

	IF v_is_eligible
		THEN
			IF NOT v_is_from_help_section THEN
				INSERT INTO `points_log` 
				(`points`, `origin`, `origin_id`, `user_id`, `forum_post_id`) VALUES 
				(1,"subject_participation", new.forum_subject_id, new.user_id, new.forum_post_id);
			END IF;
            
            IF v_is_from_help_section THEN
				INSERT INTO `points_log` 
				(`points`, `origin`, `origin_id`, `user_id`, `forum_post_id`) VALUES 
				(1,"help_subject_participation", new.forum_subject_id, new.user_id, new.forum_post_id);
			END IF;
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `after_update_forum_post` AFTER UPDATE ON `forum_post` FOR EACH ROW BEGIN
DECLARE v_is_eligible BOOLEAN DEFAULT
    (SELECT COUNT(points_log_id) FROM points_log 
    WHERE date >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
    AND user_id = new.user_id
    AND OLD.subject_answer <> NEW.subject_answer
    AND origin = "answer_subject") = 0;
    
    DECLARE v_is_solved BOOLEAN DEFAULT
    (SELECT subject_answer FROM forum_post
    WHERE forum_post_id = NEW.forum_post_id) = 1;

	IF v_is_eligible
		THEN
            IF v_is_solved THEN
				INSERT INTO `points_log` 
				(`points`, `origin`, `origin_id`, `user_id`, `forum_post_id`) VALUES 
				(1,"answer_subject", new.forum_subject_id, new.user_id, new.forum_post_id);
			END IF;
	END IF;
    
    IF NOT v_is_solved THEN
				DELETE FROM points_log 
                WHERE forum_post_id = NEW.forum_post_id
                AND origin = "answer_subject"; 
			END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
  `access_level` int DEFAULT '0',
  `help_section` int DEFAULT '0',
  PRIMARY KEY (`forum_section_id`),
  KEY `fkParentForumSection_idx` (`parent_forum_section_id`),
  KEY `fkHouse_idx` (`house_id`),
  CONSTRAINT `fkHouse` FOREIGN KEY (`house_id`) REFERENCES `house` (`house_id`),
  CONSTRAINT `fkParentForumSec` FOREIGN KEY (`parent_forum_section_id`) REFERENCES `forum_section` (`forum_section_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_section`
--

LOCK TABLES `forum_section` WRITE;
/*!40000 ALTER TABLE `forum_section` DISABLE KEYS */;
INSERT INTO `forum_section` VALUES (5,'GÃ©nÃ©ral','Mauris tristique maximus consectetur. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque cursus et enim vel fringilla. Duis malesuada sem ac lectus rhoncus iaculis. Donec eros libero, varius ut eros ac, sollicitudin vestibulum magna. Nullam pulvinar porta libero. Ut auctor congue vestibulum. Nullam accumsan mi nec interdum blandit. In eleifend eget lorem ultrices consectetur. Nulla faucibus diam ut imperdiet condimentum. Maecenas luctus tincidunt velit vel faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut gravida quam est, nec condimentum felis hendrerit in. ',NULL,NULL,0,0),(6,'Discussion','Donec venenatis ligula et nunc facilisis',5,NULL,0,0),(7,'HEIG','Discussions de l\'Ã©cole !',6,NULL,0,0),(23,'Maison SystÃ¨me informatique embarquÃ©e','Forum regroupant les Ã©lÃ¨ves de l\'orientation SystÃ¨me informatique embarquÃ©e',NULL,1,0,0),(25,'Maison SÃ©curitÃ© informatique','Forum regroupant les Ã©lÃ¨ves de l\'orientation SÃ©curitÃ© informatique',NULL,2,0,0),(26,'Maison RÃ©seaux et systÃ¨mes','Forum regroupant les Ã©lÃ¨ves de l\'orientation RÃ©seaux et systÃ¨mes',NULL,3,0,0),(27,'Maison Informatique logicielle','Forum regroupant les Ã©lÃ¨ves de l\'orientation Informatique Logicielle',NULL,4,0,0),(28,'Maison IngÃ©nierie des donnÃ©es','Forum regroupant les Ã©lÃ¨ves de l\'orientation IngÃ©nierie des donnÃ©es',NULL,5,0,0),(36,'Hello','Hello',26,3,0,0),(37,'Hello Hello','Hello Hello',36,3,0,0),(41,'Administrateur','Le salon des administrateurs',NULL,NULL,75,0),(60,'Aide','Cette section a pour but d\'aider les Ã©tudiants en TIC dans tout ce qui porte Ã  l\'Ã©cole',NULL,NULL,0,1),(61,'Campus','Posez vos questions sur l\'HEIG-VD',60,NULL,0,1),(62,'PremiÃ¨re annÃ©e','Posez vos questions sur les cours de premiÃ¨re annÃ©e',60,NULL,0,1),(63,'DeuxiÃ¨me annÃ©e','Posez vos questions sur les cours de deuxiÃ¨me annÃ©e',60,NULL,0,1),(64,'TroisiÃ¨me annÃ©e','Posez vos questions sur les cours de troisiÃ¨me annÃ©e',60,NULL,0,1),(65,'Semestre 1','Ici se trouvent les cours du semestre 1',62,NULL,0,1),(66,'Semestre 2','Ici se trouvent les cours du semestre 2',62,NULL,0,1),(67,'ANA','Questions sur Analyse mathÃ©matique (ANA)',66,NULL,0,1),(68,'Semestre 3','Section pour les cours de semestre 3',63,NULL,0,1),(69,'BDR','Section pour le cours de Base de donnÃ©es relationnelles',68,NULL,0,1),(70,'Semestre 4','Section pour les cours de semestre 4',63,NULL,0,1);
/*!40000 ALTER TABLE `forum_section` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `on_before_insert_section` BEFORE INSERT ON `forum_section` FOR EACH ROW BEGIN
    DECLARE parent_house_id INT;
    DECLARE parent_is_help BOOLEAN;
    if NEW.parent_forum_section_id IS NOT NULL THEN
        SELECT house_id, help_section INTO parent_house_id, parent_is_help FROM forum_section WHERE forum_section_id = NEW.parent_forum_section_id;
        SET NEW.house_id = parent_house_id;
        SET NEW.help_section = parent_is_help;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
  `resolved` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`forum_subject_id`),
  KEY `fkForumSection_idx` (`forum_section_id`),
  KEY `fkUser_idx` (`user_id`),
  CONSTRAINT `fkForumSection3` FOREIGN KEY (`forum_section_id`) REFERENCES `forum_section` (`forum_section_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fkUser2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_subject`
--

LOCK TABLES `forum_subject` WRITE;
/*!40000 ALTER TABLE `forum_subject` DISABLE KEYS */;
INSERT INTO `forum_subject` VALUES (54,'Par quelle couleur faut-il remplacer les stores du bÃ¢timent Cheseaux ?','2020-04-20 13:17:42',7,5,0),(56,'Quelles sont vos techniques pour prÃ©parer un test sur ordi ? (E.g POO2)','2020-04-20 14:52:42',7,10,0),(58,'On doit planifier une rÃ©union pour l\'avenir de notre site ','2020-04-20 15:07:54',41,5,0),(59,'Comment est-ce possible d\'avoir un prix BÃ©ton en Ã©tant aussi moche ?','2020-04-20 15:09:48',7,4,0),(60,'Comment rÃ©soudre l\'intÃ©grale de cos(x)*e^x ?','2020-04-20 15:26:02',67,4,0),(62,'Comment est-ce que vous fixez le timezone dans MySQL ?','2020-04-22 12:41:34',69,5,0),(63,'Avez-vous une astuce pour mÃ©moriser les angles avec cos, sin et tan ?','2020-04-28 16:02:44',67,4,0),(64,'Bonjour cher TS, prÃ©voyons d\'envahir les IL !','2020-04-28 16:58:19',25,9,0),(67,'Comment on calcul l\'air sous deux courbe ?','2020-05-11 17:43:57',67,1,0);
/*!40000 ALTER TABLE `forum_subject` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `after_insert_forum_subject` AFTER INSERT ON `forum_subject` FOR EACH ROW BEGIN
	DECLARE v_is_eligible BOOLEAN DEFAULT
    (SELECT COUNT(points_log_id) FROM points_log 
    WHERE date >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
    AND user_id = new.user_id
    AND (origin = "subject_creation" OR origin = "help_creation")) = 0;
    
    DECLARE v_is_from_help_section BOOLEAN DEFAULT
    (SELECT help_section FROM forum_section
    INNER JOIN forum_subject USING (forum_section_id)
    WHERE forum_subject_id = NEW.forum_subject_id) = 1;
    
    IF v_is_eligible
		THEN
		IF NOT v_is_from_help_section
			THEN
			INSERT INTO `points_log` 
			(`points`, `origin`, `origin_id`, `user_id`) VALUES 
			(1,"subject_creation", new.forum_subject_id, new.user_id);
		END IF;

		IF v_is_from_help_section
			THEN
			INSERT INTO `points_log` 
			(`points`, `origin`, `origin_id`, `user_id`) VALUES 
			(1,"help_creation", new.forum_subject_id, new.user_id);
		END IF;
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`house_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `house`
--

LOCK TABLES `house` WRITE;
/*!40000 ALTER TABLE `house` DISABLE KEYS */;
INSERT INTO `house` VALUES (1,'SystÃ¨mes informatiques embarquÃ©s','IE',NULL),(2,'SÃ©curitÃ© informatique','TS',NULL),(3,'RÃ©seaux et systÃ¨mes','TR',NULL),(4,'Informatique logicielle','IL',NULL),(5,'IngÃ©nierie des donnÃ©es','ID',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `points_difficulty`
--

LOCK TABLES `points_difficulty` WRITE;
/*!40000 ALTER TABLE `points_difficulty` DISABLE KEYS */;
INSERT INTO `points_difficulty` VALUES (1,1,1,10),(2,1,2,6),(3,1,3,3),(4,2,1,23),(5,2,2,15),(6,2,3,7),(7,3,1,50),(8,3,2,25),(9,3,3,15),(10,4,1,100),(11,4,2,60),(12,4,3,30);
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
  `points` int NOT NULL DEFAULT '0',
  `origin` mediumtext,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  `forum_post_id` int DEFAULT NULL,
  `event_id` int DEFAULT NULL,
  `origin_id` int DEFAULT NULL,
  PRIMARY KEY (`points_log_id`),
  KEY `fkUser3_idx` (`user_id`),
  KEY `fkForumPost2_idx` (`forum_post_id`),
  KEY `fkEvent2_idx` (`event_id`),
  CONSTRAINT `fkEvent2_idx` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fkForumPost2_idx` FOREIGN KEY (`forum_post_id`) REFERENCES `forum_post` (`forum_post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fkUser3_idx` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=280 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `points_log`
--

LOCK TABLES `points_log` WRITE;
/*!40000 ALTER TABLE `points_log` DISABLE KEYS */;
INSERT INTO `points_log` VALUES (7,1,'subject_creation','2020-04-09 18:31:32',5,NULL,NULL,37),(8,1,'subject_creation','2020-04-10 01:48:26',10,NULL,NULL,39),(11,1,'subject_creation','2020-04-11 19:56:09',5,NULL,NULL,40),(14,1,'help_creation','2020-04-14 13:55:12',5,NULL,NULL,45),(17,1,'subject_creation','2020-04-14 15:28:00',5,NULL,NULL,48),(18,1,'help_creation','2020-04-14 22:07:58',1,NULL,NULL,49),(25,1,'subject_creation','2020-04-16 17:04:32',10,NULL,NULL,50),(26,1,'help_creation','2020-04-20 12:20:40',5,NULL,NULL,51),(27,1,'subject_creation','2020-04-20 13:38:59',5,NULL,NULL,55),(28,1,'subject_creation','2020-04-20 14:52:42',10,NULL,NULL,56),(29,1,'subject_participation','2020-04-20 14:52:53',10,271,NULL,54),(30,1,'subject_creation','2020-04-20 15:06:27',5,NULL,NULL,57),(31,1,'subject_creation','2020-04-20 15:09:48',4,NULL,NULL,59),(32,1,'help_subject_participation','2020-04-20 15:39:23',5,272,NULL,60),(33,1,'subject_creation','2020-04-22 10:21:23',1,NULL,NULL,61),(34,1,'help_creation','2020-04-22 12:41:34',5,NULL,NULL,62),(35,1,'help_subject_participation','2020-04-28 14:53:13',4,281,NULL,62),(38,1,'help_subject_participation','2020-04-28 16:01:40',4,286,NULL,62),(39,1,'help_creation','2020-04-28 16:02:44',4,NULL,NULL,63),(40,1,'subject_creation','2020-04-28 16:58:19',9,NULL,NULL,64),(42,1,'subject_participation','2020-04-28 17:24:29',5,290,NULL,58),(43,1,'subject_creation','2020-05-11 14:45:36',1,NULL,NULL,65),(45,1,'subject_creation','2020-05-11 17:02:15',1,NULL,NULL,66),(95,5,'event_group_won','2020-05-13 20:06:34',6,NULL,11,NULL),(96,1,'event_group_won','2020-05-13 20:06:34',1,NULL,11,NULL),(97,1,'event_group_won','2020-05-13 20:06:34',2,NULL,11,NULL),(98,1,'event_group_won','2020-05-13 20:06:34',9,NULL,11,NULL),(99,0,'event_group_won','2020-05-13 20:06:34',3,NULL,11,NULL),(100,0,'event_group_won','2020-05-13 20:06:34',11,NULL,11,NULL),(102,5,'event_solo_won','2020-05-13 20:16:29',1,NULL,11,NULL),(103,3,'event_solo_won','2020-05-13 20:16:29',2,NULL,11,NULL),(104,1,'event_solo_won','2020-05-13 20:16:29',3,NULL,11,NULL),(105,10,'event_solo_won','2020-05-13 20:20:27',1,NULL,11,NULL),(106,6,'event_solo_won','2020-05-13 20:20:27',2,NULL,11,NULL),(107,3,'event_solo_won','2020-05-13 20:20:27',3,NULL,11,NULL),(108,5,'event_participation','2020-05-13 20:23:35',1,NULL,11,NULL),(109,5,'event_participation','2020-05-13 20:23:35',2,NULL,11,NULL),(110,5,'event_participation','2020-05-13 20:23:35',3,NULL,11,NULL),(111,5,'event_participation','2020-05-13 20:23:35',4,NULL,11,NULL),(112,5,'event_participation','2020-05-13 20:23:35',5,NULL,11,NULL),(113,5,'event_participation','2020-05-13 20:23:35',6,NULL,11,NULL),(114,5,'event_participation','2020-05-13 20:23:35',9,NULL,11,NULL),(115,5,'event_participation','2020-05-13 20:23:35',10,NULL,11,NULL),(116,5,'event_participation','2020-05-13 20:23:35',11,NULL,11,NULL),(123,10,'event_solo_won','2020-05-13 20:23:35',3,NULL,11,NULL),(124,6,'event_solo_won','2020-05-13 20:23:35',5,NULL,11,NULL),(125,3,'event_solo_won','2020-05-13 20:23:35',4,NULL,11,NULL),(126,5,'event_participation','2020-05-13 20:25:49',1,NULL,11,NULL),(127,5,'event_participation','2020-05-13 20:25:49',2,NULL,11,NULL),(128,5,'event_participation','2020-05-13 20:25:49',3,NULL,11,NULL),(129,5,'event_participation','2020-05-13 20:25:49',4,NULL,11,NULL),(130,5,'event_participation','2020-05-13 20:25:49',5,NULL,11,NULL),(131,5,'event_participation','2020-05-13 20:25:49',6,NULL,11,NULL),(132,5,'event_participation','2020-05-13 20:25:49',9,NULL,11,NULL),(133,5,'event_participation','2020-05-13 20:25:49',10,NULL,11,NULL),(134,5,'event_participation','2020-05-13 20:25:49',11,NULL,11,NULL),(141,10,'event_group_won','2020-05-13 20:25:49',6,NULL,11,NULL),(142,6,'event_group_won','2020-05-13 20:25:49',10,NULL,11,NULL),(143,1,'event_group_won','2020-05-13 20:25:49',4,NULL,11,NULL),(144,1,'event_group_won','2020-05-13 20:25:49',5,NULL,11,NULL),(146,5,'event_participation','2020-05-13 23:01:02',1,NULL,11,NULL),(147,5,'event_participation','2020-05-13 23:01:02',2,NULL,11,NULL),(148,5,'event_participation','2020-05-13 23:01:02',3,NULL,11,NULL),(149,5,'event_participation','2020-05-13 23:01:02',4,NULL,11,NULL),(150,5,'event_participation','2020-05-13 23:01:02',5,NULL,11,NULL),(151,5,'event_participation','2020-05-13 23:01:02',6,NULL,11,NULL),(152,5,'event_participation','2020-05-13 23:01:02',9,NULL,11,NULL),(153,5,'event_participation','2020-05-13 23:01:02',10,NULL,11,NULL),(154,5,'event_participation','2020-05-13 23:01:02',11,NULL,11,NULL),(161,10,'event_group_won','2020-05-13 23:01:02',6,NULL,11,NULL),(162,6,'event_group_won','2020-05-13 23:01:02',10,NULL,11,NULL),(163,1,'event_group_won','2020-05-13 23:01:02',4,NULL,11,NULL),(164,1,'event_group_won','2020-05-13 23:01:02',5,NULL,11,NULL),(166,5,'event_participation','2020-05-13 23:01:21',1,NULL,11,NULL),(167,5,'event_participation','2020-05-13 23:01:21',2,NULL,11,NULL),(168,5,'event_participation','2020-05-13 23:01:21',3,NULL,11,NULL),(169,5,'event_participation','2020-05-13 23:01:21',4,NULL,11,NULL),(170,5,'event_participation','2020-05-13 23:01:21',5,NULL,11,NULL),(171,5,'event_participation','2020-05-13 23:01:21',6,NULL,11,NULL),(172,5,'event_participation','2020-05-13 23:01:21',9,NULL,11,NULL),(173,5,'event_participation','2020-05-13 23:01:21',10,NULL,11,NULL),(174,5,'event_participation','2020-05-13 23:01:21',11,NULL,11,NULL),(181,10,'event_solo_won','2020-05-13 23:01:21',1,NULL,11,NULL),(182,6,'event_solo_won','2020-05-13 23:01:21',2,NULL,11,NULL),(183,3,'event_solo_won','2020-05-13 23:01:21',3,NULL,11,NULL),(184,5,'event_participation','2020-05-13 23:01:31',1,NULL,11,NULL),(185,5,'event_participation','2020-05-13 23:01:31',2,NULL,11,NULL),(186,5,'event_participation','2020-05-13 23:01:31',3,NULL,11,NULL),(187,5,'event_participation','2020-05-13 23:01:31',4,NULL,11,NULL),(188,5,'event_participation','2020-05-13 23:01:31',5,NULL,11,NULL),(189,5,'event_participation','2020-05-13 23:01:31',6,NULL,11,NULL),(190,5,'event_participation','2020-05-13 23:01:31',9,NULL,11,NULL),(191,5,'event_participation','2020-05-13 23:01:31',10,NULL,11,NULL),(192,5,'event_participation','2020-05-13 23:01:31',11,NULL,11,NULL),(199,10,'event_solo_won','2020-05-13 23:01:31',1,NULL,11,NULL),(200,6,'event_solo_won','2020-05-13 23:01:31',2,NULL,11,NULL),(201,3,'event_solo_won','2020-05-13 23:01:32',3,NULL,11,NULL),(202,5,'event_participation','2020-05-14 08:12:22',1,NULL,11,NULL),(203,5,'event_participation','2020-05-14 08:12:22',2,NULL,11,NULL),(204,5,'event_participation','2020-05-14 08:12:22',3,NULL,11,NULL),(205,5,'event_participation','2020-05-14 08:12:22',4,NULL,11,NULL),(206,5,'event_participation','2020-05-14 08:12:22',5,NULL,11,NULL),(207,5,'event_participation','2020-05-14 08:12:22',6,NULL,11,NULL),(208,5,'event_participation','2020-05-14 08:12:22',9,NULL,11,NULL),(209,5,'event_participation','2020-05-14 08:12:22',10,NULL,11,NULL),(210,5,'event_participation','2020-05-14 08:12:22',11,NULL,11,NULL),(217,10,'event_solo_won','2020-05-14 08:12:22',1,NULL,11,NULL),(218,6,'event_solo_won','2020-05-14 08:12:22',2,NULL,11,NULL),(219,3,'event_solo_won','2020-05-14 08:12:22',3,NULL,11,NULL),(220,5,'event_participation','2020-05-14 08:12:29',1,NULL,11,NULL),(221,5,'event_participation','2020-05-14 08:12:29',2,NULL,11,NULL),(222,5,'event_participation','2020-05-14 08:12:29',3,NULL,11,NULL),(223,5,'event_participation','2020-05-14 08:12:29',4,NULL,11,NULL),(224,5,'event_participation','2020-05-14 08:12:29',5,NULL,11,NULL),(225,5,'event_participation','2020-05-14 08:12:29',6,NULL,11,NULL),(226,5,'event_participation','2020-05-14 08:12:29',9,NULL,11,NULL),(227,5,'event_participation','2020-05-14 08:12:29',10,NULL,11,NULL),(228,5,'event_participation','2020-05-14 08:12:29',11,NULL,11,NULL),(235,10,'event_group_won','2020-05-14 08:12:30',6,NULL,11,NULL),(236,6,'event_group_won','2020-05-14 08:12:30',10,NULL,11,NULL),(237,1,'event_group_won','2020-05-14 08:12:30',4,NULL,11,NULL),(238,1,'event_group_won','2020-05-14 08:12:30',5,NULL,11,NULL),(240,5,'event_participation','2020-05-14 08:12:37',1,NULL,11,NULL),(241,5,'event_participation','2020-05-14 08:12:37',2,NULL,11,NULL),(242,5,'event_participation','2020-05-14 08:12:37',3,NULL,11,NULL),(243,5,'event_participation','2020-05-14 08:12:37',4,NULL,11,NULL),(244,5,'event_participation','2020-05-14 08:12:37',5,NULL,11,NULL),(245,5,'event_participation','2020-05-14 08:12:37',6,NULL,11,NULL),(246,5,'event_participation','2020-05-14 08:12:37',9,NULL,11,NULL),(247,5,'event_participation','2020-05-14 08:12:37',10,NULL,11,NULL),(248,5,'event_participation','2020-05-14 08:12:37',11,NULL,11,NULL),(255,10,'event_group_won','2020-05-14 08:12:37',6,NULL,11,NULL),(256,6,'event_group_won','2020-05-14 08:12:37',10,NULL,11,NULL),(257,1,'event_group_won','2020-05-14 08:12:37',4,NULL,11,NULL),(258,1,'event_group_won','2020-05-14 08:12:37',5,NULL,11,NULL),(260,5,'event_participation','2020-05-14 09:04:17',1,NULL,11,NULL),(261,5,'event_participation','2020-05-14 09:04:17',2,NULL,11,NULL),(262,5,'event_participation','2020-05-14 09:04:17',3,NULL,11,NULL),(263,5,'event_participation','2020-05-14 09:04:17',4,NULL,11,NULL),(264,5,'event_participation','2020-05-14 09:04:17',5,NULL,11,NULL),(265,5,'event_participation','2020-05-14 09:04:17',6,NULL,11,NULL),(266,5,'event_participation','2020-05-14 09:04:17',9,NULL,11,NULL),(267,5,'event_participation','2020-05-14 09:04:17',10,NULL,11,NULL),(268,5,'event_participation','2020-05-14 09:04:17',11,NULL,11,NULL),(275,10,'event_group_won','2020-05-14 09:04:17',6,NULL,11,NULL),(276,6,'event_group_won','2020-05-14 09:04:17',10,NULL,11,NULL),(277,1,'event_group_won','2020-05-14 09:04:17',4,NULL,11,NULL),(278,1,'event_group_won','2020-05-14 09:04:17',5,NULL,11,NULL);
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
  `last_online` datetime DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `status_id` int DEFAULT NULL,
  `access_level` int DEFAULT '0',
  `initials` varchar(255) DEFAULT NULL,
  `house_id` int DEFAULT NULL,
  `avatar` mediumtext,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fkRole_idx` (`role_id`),
  KEY `fkStat_idx` (`status_id`),
  KEY `FKleet9ikwn36n2m1l5ndf2fpbe` (`house_id`),
  CONSTRAINT `FKleet9ikwn36n2m1l5ndf2fpbe` FOREIGN KEY (`house_id`) REFERENCES `house` (`house_id`),
  CONSTRAINT `fkRole` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'1986-07-29 00:00:00',NULL,'stefan.teofanovic@heig-vd.ch','Stefan','2020-03-17 17:24:02','Teofanovic','testtest',1,1,75,NULL,2,'http://localhost:8080/content/Teofanovic.png',NULL),(2,1,'1993-08-09 00:00:00',NULL,'michael.triponez@heig-vd.ch','Michael',NULL,'Triponez','test',1,1,25,NULL,2,'http://localhost:8080/content/Triponez.png',NULL),(3,2,'2020-03-19 00:00:00','2020-03-19 08:16:21','tst','tester','2020-03-19 08:16:56','To delete','tst',1,1,0,NULL,3,NULL,NULL),(4,1,'1996-01-12 00:00:00',NULL,'g.valvona@hotmail.com','Guillaume','2020-03-30 12:26:13','Valvona','691021',1,1,0,NULL,4,NULL,NULL),(5,1,'1996-06-29 00:00:00',NULL,'dalia.maillefer@heig-vd.ch','Dalia',NULL,'Maillefer','dadada',1,1,75,NULL,4,'http://localhost:8080/content/Maillefer.png',NULL),(6,1,'2020-04-03 00:00:00','2020-04-04 14:26:55','salut.coucou@heig-vd.ch','12345','2020-04-04 14:26:55','salut','12345',1,1,0,NULL,1,NULL,NULL),(9,1,'2020-04-29 00:00:00','2020-04-04 14:40:29','new.test@heig-vd.ch','new','2020-04-04 14:40:29','teest','tst',1,1,0,NULL,2,NULL,NULL),(10,1,'1910-03-16 00:00:00','2020-04-04 16:11:33','elodie.lagier@heig-vd.ch','Elodie','2020-04-04 16:11:33','Lagier','lol',1,1,75,NULL,5,'http://localhost:8080/content/Lagier.jpeg',NULL),(11,1,'2020-03-30 00:00:00','2020-04-04 16:28:23','super.tester@heig-vd.ch','mike','2020-04-04 16:28:23','hello','123456',1,1,0,NULL,3,NULL,NULL);
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
INSERT INTO `user_participate_event` VALUES (1,1),(1,2),(3,2),(5,3),(1,11),(2,11),(3,11),(4,11),(5,11),(6,11),(9,11),(10,11),(11,11);
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
  `roles_role_id` int NOT NULL,
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
INSERT INTO `user_role` VALUES (1,1,0);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'DEV'
--

--
-- Dumping routines for database 'DEV'
--
/*!50003 DROP FUNCTION IF EXISTS `getDetailEventJson` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `getDetailEventJson`(v_event_id int) RETURNS json
    DETERMINISTIC
BEGIN
    RETURN (SELECT JSON_OBJECT(
            'event_id', event_id,
            'name', name,
            'description', description,
            'is_competitive', is_competitive,
            'difficulty', difficulty,
            'battleroyale', battleroyale,
            'status', status,
            'price', price,
            'attendees_min', attendees_min,
            'attendees_max', attendees_max,
            'created', DATE_FORMAT(created, "%d %M %Y - %H:%i"),
            'deadline_reservation', DATE_FORMAT(deadline_reservation, "%d %M %Y - %H:%i"),
            'date_begin', DATE_FORMAT(date_begin, "%d %M %Y - %H:%i"),
            'date_end', DATE_FORMAT(date_end, "%d %M %Y - %H:%i"),
            'location', location,
            'address', address,
            'house', getHouseJSON(house_id),
			'organisator', getUserJSON(user_id),
            'participants', getParticipantsEvent(event_id),
            'nb_attendees', nb_attendees) AS result
            FROM (SELECT event.*, count(user_participate_event.user_id) as nb_attendees
				FROM event
				LEFT JOIN user_participate_event USING(event_id)
				GROUP BY event_id) AS events 
			WHERE event_id = v_event_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getDetailHouseJSON` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `getDetailHouseJSON`(v_house_id INT) RETURNS json
    DETERMINISTIC
BEGIN
	RETURN (SELECT JSON_OBJECT(
			'house_id', house_id,
            'name', name,
            'shortname', shortname,
            'avatar', avatar,
            'nb_members', nb_members,
            'nb_events', nb_events,
            -- 'nb_victories', nb_victories,
            'nb_participants', nb_participants,
            'nb_subjects', nb_subjects,
            'nb_posts', nb_posts,
            'total_pts', sum(getPointsHouse(house_id)),
            'top_user', getTopUserFromHouseJSON(house_id, 1)
            ) AS result
            FROM (
				SELECT house.*,
					count(distinct user.user_id) as nb_members,
                    count(distinct event.event_id) as nb_events,
                    count(distinct user_participate_event.user_id) as nb_participants,
                    count(distinct forum_subject.user_id) as nb_subjects,
                    count(distinct forum_post.user_id) as nb_posts
				FROM house
				LEFT JOIN user USING(house_id)
                LEFT JOIN event USING(user_id)
                LEFT JOIN user_participate_event USING(user_id)
                LEFT JOIN forum_subject USING(user_id)
                LEFT JOIN forum_post USING(user_id)
                LEFT JOIN points_log USING(user_id)
                WHERE user.active = 1 and house.house_id = v_house_id
				GROUP BY house_id) AS house_count
			GROUP BY house_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getEventCreatedByUserJSON` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `getEventCreatedByUserJSON`(v_user_id INT) RETURNS json
    DETERMINISTIC
BEGIN
	RETURN (SELECT json_arrayagg(getDetailEventJson(event.event_id)) AS result
		FROM event
		WHERE user_id = v_user_id
		ORDER BY date_begin ASC);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getEventFromHouseJSON` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `getEventFromHouseJSON`(v_house_id INT, v_nb_limit INT) RETURNS json
    DETERMINISTIC
BEGIN
	RETURN (SELECT json_arrayagg(getDetailEventJson(event.event_id)) AS result
		FROM event
		WHERE house_id = v_house_id AND status = "En cours" OR status = "En attente"
		ORDER BY date_begin ASC
        LIMIT v_nb_limit);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getEventJSON` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `getEventJSON`( v_nb_limit int) RETURNS json
    DETERMINISTIC
BEGIN
    IF v_nb_limit > 0 THEN
        RETURN (SELECT json_arrayagg(JSON_OBJECT(
                'event_id', events.event_id,
                'name', events.name,
                'description', events.description,
                'is_competitve', events.is_competitive,
                'battleroyale', battleroyale,
                'difficulty', events.difficulty,
                'status', events.status,
                'price', events.price,
                'deadline_reservation', events.deadline_reservation,
                'date_begin', events.date_begin,
                'date_end', events.date_end,
                'location', events.location,
                'house_id', events.house_id,
                'house_name', events.house_name,
                'organisator', getUserJSON(events.user_id),
                'attendees_min', attendees_min,
                'attendees_max', attendees_max,
                'nb_attendees', nb_attendees)) AS result
                FROM (SELECT event.*, house.name AS house_name, COUNT(user_participate_event.user_id) AS nb_attendees
                      FROM event
                               LEFT JOIN house USING(house_id)
                               INNER JOIN user_participate_event using(event_id)
                      GROUP BY event_id
                     ) AS events
                WHERE events.status = 'En cours' OR events.status = 'En attente'
                ORDER BY date_begin ASC LIMIT v_nb_limit);
    ELSE
        RETURN (SELECT json_arrayagg(JSON_OBJECT(
                'event_id', events.event_id,
                'name', events.name,
                'description', events.description,
                'is_competitve', events.is_competitive,
                'battleroyale', battleroyale,
                'difficulty', events.difficulty,
                'status', events.status,
                'price', events.price,
                'deadline_reservation', events.deadline_reservation,
                'date_begin', events.date_begin,
                'date_end', events.date_end,
                'location', events.location,
                'house_id', events.house_id,
                'house_name', events.house_name,
                'organisator', getUserJSON(events.user_id),
                'attendees_min', attendees_min,
                'attendees_max', attendees_max,
                'nb_attendees', nb_attendees)) AS result
                FROM (SELECT event.*, house.name AS house_name, COUNT(user_participate_event.user_id) AS nb_attendees
                      FROM event
                               LEFT JOIN house USING(house_id)
                               INNER JOIN user_participate_event using(event_id)
                      GROUP BY event_id
                     ) AS events
                WHERE events.status = 'En cours' OR events.status = 'En attente'
                ORDER BY date_begin ASC);
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getEventParticipatedByUserJSON` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `getEventParticipatedByUserJSON`(v_user_id INT) RETURNS json
    DETERMINISTIC
BEGIN
	RETURN (SELECT json_arrayagg(getDetailEventJson(event.event_id)) AS result
	FROM event
	JOIN user_participate_event ON user_participate_event.event_id = event.event_id
	WHERE user_participate_event.user_id = v_user_id AND (status = "En cours" OR status = "En attente"));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getForums` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `getForums`(v_access_level INT, v_house_id INT) RETURNS json
    DETERMINISTIC
proc:BEGIN
    # Appel vers la procedure stockÃ©e recursive listForumsByParent
    # premier argument null signifie que pour la premiÃ¨re rÃ©cursion on cherche les forums racines
    # output passÃ© comme parametre interposÃ©, maniÃ¨re a rÃ©cuperÃ© le JSON construit par la pile d'appels rÃ©cursifs
    DECLARE output JSON; 
    SET max_sp_recursion_depth=255;
    CALL listForumsByParent(null,v_access_level, v_house_id, output);
RETURN output;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getGlobalDataJSON` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `getGlobalDataJSON`() RETURNS json
    DETERMINISTIC
BEGIN


    RETURN (SELECT JSON_OBJECT(
                'houses', (SELECT JSON_ARRAYAGG(JSON_OBJECT(
                                    'house_id', house_id,
                                    'name', name,
                                    'shortname', shortname
                            ))
                            FROM house)
                )
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getHouseJSON` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `getHouseJSON`(v_house_id INT) RETURNS json
    DETERMINISTIC
BEGIN

RETURN 
	(SELECT json_object(
			'house_id', house_id,
            'name', name,
            'shortname', shortname,
            'avatar', avatar)
        FROM house
        WHERE house_id = v_house_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getLatestPostJSON` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `getLatestPostJSON`(v_house_id INT, v_nb_limit INT) RETURNS json
    DETERMINISTIC
BEGIN
	RETURN (SELECT json_arrayagg(JSON_OBJECT(
                'forum_post_id', forum_post_id,
                'message', message,
                'created', forum_post.created,
                'last_update', last_update,
                'subject_answer', subject_answer,
                'creator', getUserJSON(user_id))) as result
         FROM forum_post
         JOIN user USING(user_id)
         WHERE house_id = v_house_id
         ORDER BY forum_post.created DESC
         LIMIT v_nb_limit);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getNbPostPerUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `getNbPostPerUser`(v_user_id int) RETURNS int
    DETERMINISTIC
BEGIN
	DECLARE total_post int;
	SELECT COUNT(forum_post_id) INTO total_post
	FROM post
	WHERE user_id = v_user_id;
	RETURN total_post;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getParticipantsEvent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `getParticipantsEvent`(v_event_id INT) RETURNS json
    DETERMINISTIC
BEGIN

RETURN (SELECT json_arrayagg(JSON_OBJECT(
    'participant', getUserJSON(user_id))) FROM user_participate_event
    WHERE event_id = v_event_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getPointsHouse` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `getPointsHouse`(v_house_id INT) RETURNS int
    DETERMINISTIC
BEGIN
	DECLARE total_points INT;
	SELECT SUM(getPointsUser(user_id)) INTO total_points
	FROM house
    JOIN user USING(house_id)
    WHERE house_id = v_house_id;
	RETURN total_points;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getPointsUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `getPointsUser`(v_user_id INT) RETURNS int
    DETERMINISTIC
BEGIN
	DECLARE total_points INT;
	SELECT SUM(points) INTO total_points 
    FROM points_log
	WHERE user_id = v_user_id;
	RETURN total_points;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getPostsJSON` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `getPostsJSON`(v_forum_subject_id int) RETURNS json
    DETERMINISTIC
BEGIN

    RETURN
        (SELECT JSON_arrayagg(post) FROM (SELECT JSON_object(
                'forum_post_id', forum_post_id,
                'message', message,
                'created', created,
                'last_update',last_update,
                'subject_answer',subject_answer,
                'creator', getUserJSON(user_id)) as post
         FROM forum_post
         WHERE forum_subject_id = v_forum_subject_id
         ORDER BY subject_answer DESC, created DESC) as posts);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getRankingJSON` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `getRankingJSON`() RETURNS json
    DETERMINISTIC
BEGIN

    RETURN (SELECT json_arrayagg(JSON_object( 
            'user', getUserJSON(user_id),
            'total_points', total_points)) as result
            FROM (SELECT user.*, SUM(points) as total_points
                  FROM points_log
                           INNER JOIN user USING(user_id)
						   INNER JOIN house using(house_id)

                  group by user_id, house.name
                  ORDER BY total_points DESC
                 ) as log);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getRankUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `getRankUser`(v_user_id INT) RETURNS int
    DETERMINISTIC
BEGIN
	DECLARE n_rank INT;
	SELECT RANK() OVER (ORDER BY getPointsUser(user_id) ASC) user_rank INTO n_rank
    FROM user
    WHERE user_id = v_user_id;
	RETURN n_rank;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getRoleJSON` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `getRoleJSON`(v_role_id INT) RETURNS json
    DETERMINISTIC
BEGIN

RETURN 
	(SELECT json_object(
		'role_id', role_id,
        'name', name,
        'priority', priority)
        FROM role
        WHERE role_id = v_role_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getStatusJSON` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `getStatusJSON`(v_status_id INT) RETURNS json
    DETERMINISTIC
BEGIN

RETURN 
	(SELECT json_object(
		'status_id', status_id,
        'name', name)
        FROM status
        WHERE status_id = v_status_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getSubjectsJSON` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `getSubjectsJSON`(v_forum_section_id int) RETURNS json
    DETERMINISTIC
BEGIN

    RETURN
        (SELECT JSON_arrayagg(subject) FROM (SELECT JSON_object(
			'forum_subject_id', forum_subject_id,
			'name', name,
			'created', forum_subject.created,
			'forum_section_id', forum_section_id,
			'resolved', resolved,
			'creator', getUserJSON(forum_subject.user_id)
			,'posts', getPostsJSON(forum_subject_id)
			) as subject
		 FROM forum_subject
		 LEFT JOIN (
			 SELECT MAX(created) as last_post, forum_subject_id
			 FROM forum_post GROUP BY forum_subject_id
		 ) as posts using (forum_subject_id)
		 WHERE forum_section_id = v_forum_section_id
		 ORDER BY COALESCE(last_post, created) DESC) as subjects);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getTopUserFromHouseJSON` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `getTopUserFromHouseJSON`(v_house_id INT, v_nb_limit INT) RETURNS json
    DETERMINISTIC
BEGIN
	RETURN (
		SELECT json_arrayagg(getUserJSON(user_id))
		FROM (
			SELECT user_id, house_id, getPointsUser(user_id) AS points
            FROM user
			WHERE house_id = v_house_id
			ORDER BY points DESC
			LIMIT v_nb_limit) AS bestUser
		);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getUpcomingEventJSON` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `getUpcomingEventJSON`() RETURNS json
    DETERMINISTIC
BEGIN
	RETURN (SELECT json_arrayagg(getDetailEventJson(event_id)) as result
		FROM event
		WHERE status = "En cours" OR status = "En attente"
		ORDER BY date_begin ASC);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getUserJSON` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `getUserJSON`(v_user_id int) RETURNS json
    DETERMINISTIC
BEGIN

    RETURN (SELECT json_object(
			   'user_id', user_id,
			   'active', active,
			   'birth', (SELECT DATE_FORMAT(birth, "%d %M %Y")),
			   'created', created,
			   'email', email,
			   'firstname', firstname,
			   'initials', (CONCAT(LEFT(UPPER(firstname), 1), LEFT(UPPER(lastname),1))),
			   'last_online', last_online,
			   'lastname', lastname,
			   'status', getStatusJSON(status_id),
			   'avatar', avatar,
			   'access_level', access_level,
               'points', getPointsUser(user_id),
			   'house', getHouseJSON(house_id))
            FROM user
            WHERE user_id = v_user_id
            LIMIT 1);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getUserTopN` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `getUserTopN`(Nth INT) RETURNS json
    DETERMINISTIC
BEGIN
	RETURN (SELECT json_arrayagg(getUserJSON(user_id))
	FROM user
	ORDER BY getPointsUser(user_id) DESC
    LIMIT Nth);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `answerPost` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `answerPost`(IN v_post_id INT)
BEGIN
	UPDATE forum_post SET subject_answer = 1 WHERE forum_post_id = v_post_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `answerSubject` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `answerSubject`(IN v_subject_id INT)
BEGIN
	UPDATE forum_subject SET resolved = 1 WHERE forum_subject_id = v_subject_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cancelEvent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `cancelEvent`(v_event_id INT)
BEGIN
	START TRANSACTION;

    DELETE FROM user_participate_event
    WHERE event_id = v_event_id;

    UPDATE event
    SET status = "annule"
    WHERE event_id = v_event_id;

    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `createEvent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `createEvent`(IN v_name varchar(45),
                                             IN v_description mediumtext,
                                             IN v_is_competitive int,
                                             IN v_battleroyale int,
                                             IN v_difficulty int,
                                             IN v_price int,
                                             IN v_attendees_min int,
                                             IN v_attendees_max int,
                                             IN v_deadline_reservation datetime,
                                             IN v_date_begin datetime,
                                             IN v_date_end datetime,
                                             IN v_location mediumtext,
                                             IN v_address varchar(256),
                                             IN v_user_id int,
                                             IN v_house_id int)
BEGIN
    START TRANSACTION ;
    INSERT INTO event(name, description, is_competitive, battleroyale, difficulty, price, attendees_min, attendees_max, deadline_reservation, created, date_begin, date_end, location, address, user_id, house_id) VALUES
                     (v_name, v_description, v_is_competitive, v_battleroyale, v_difficulty, v_price, v_attendees_min, v_attendees_max, v_deadline_reservation, NOW(), v_date_begin, v_date_end, v_location, v_address, v_user_id, v_house_id);

    SELECT JSON_OBJECT(
            'event_id', events.event_id,
            'name', events.name,
            'description', events.description,
            'is_competitive', events.is_competitive,
            'difficulty', events.difficulty,
            'battleroyale', events.battleroyale,
            'status', events.status,
            'price', events.price,
            'attendees_min', events.attendees_min,
            'attendees_max', events.attendees_max,
            'created',events.created,
            'deadline_reservation', events.deadline_reservation,
            'date_begin', events.date_begin,
            'date_end', events.date_end,
            'location', events.location,
            'address', events.address,
            'house_id', events.house_id,
            'house_name', events.house_name,
			'organisator', getUserJSON(user_id),
            'participants', getParticipantsEvent(event_id),
            'nb_attendees', nb_attendees) as result
            FROM (SELECT event.*, house.name as house_name, count(user_participate_event.user_id) as nb_attendees
                  FROM event
                           LEFT JOIN house USING(house_id)
                           LEFT join user_participate_event using(event_id)

                  group by event_id
                 ) as events WHERE event_id = LAST_INSERT_ID();
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteEvent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `deleteEvent`(IN v_event_id int)
BEGIN
    START TRANSACTION;

    DELETE FROM user_participate_event
    WHERE event_id = v_event_id;

    DELETE FROM event
    WHERE event_id = v_event_id;

    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deletePost` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `deletePost`(IN v_post_id INT)
BEGIN
	START TRANSACTION;
    DELETE FROM forum_post
    WHERE forum_post_id = v_post_id;    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteSection` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `deleteSection`(IN v_section_id INT)
BEGIN
	START TRANSACTION;
    DELETE FROM forum_section
    WHERE forum_section_id = v_section_id;    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteSubject` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `deleteSubject`(IN v_subject_id INT)
BEGIN
	START TRANSACTION;
    DELETE FROM forum_subject
    WHERE forum_subject_id = v_subject_id;    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `deleteUser`(IN v_user_id int)
BEGIN
	START TRANSACTION;
    UPDATE user
    SET active = 0
    WHERE user_id = v_user_id;    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertPointsBasedFromEvent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `insertPointsBasedFromEvent`(IN v_event_id INT)
BEGIN
	INSERT INTO points_log (points, origin, date, user_id, event_id)
    SELECT  5, "event_participation", NOW(), user.user_id, v_event_id
    FROM    user
    INNER JOIN user_participate_event USING (user_id)
    WHERE   user_participate_event.event_id = v_event_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertPointsFromEvent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `insertPointsFromEvent`(IN v_event_id INT, IN v_user_id int, IN v_points int)
BEGIN
	INSERT INTO points_log (points, origin, date, user_id, event_id) VALUES 
    (v_points, "event_solo_won", NOW(), v_user_id, v_event_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertPointsGroupFromEvent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `insertPointsGroupFromEvent`(IN v_event_id INT, IN v_points int, IN v_house_id INT)
BEGIN
	INSERT INTO points_log (points, origin, date, user_id, event_id)
    SELECT  v_points, "event_group_won", NOW() ,user.user_id, v_event_id
    FROM    user
    WHERE   user.house_id = v_house_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertPost` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `insertPost`(IN v_message longtext, IN v_forum_subject_id int, IN v_user_id int)
BEGIN
	START TRANSACTION;
		INSERT INTO forum_post (message, created, last_update, forum_subject_id, user_id)
		VALUES (v_message, NOW(), NOW(), v_forum_subject_id, v_user_id);
        SELECT JSON_OBJECT(
        'forum_post_id', forum_post_id,
        'message', message,
        'created', created,
        'last_update', last_update,
        'forum_subject_id', forum_subject_id,
        'creator',  getUserJSON(user_id)
    ) as result FROM forum_post WHERE forum_post_id = LAST_INSERT_ID();
    COMMIT;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertSection` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `insertSection`(IN v_name varchar(45), IN v_description mediumtext,
                                               IN v_parent_forum_section_id int, IN v_house_id int, IN v_help boolean)
BEGIN
    START TRANSACTION ;
	INSERT INTO forum_section (name, description, parent_forum_section_id, house_id, help_section) VALUES
    (v_name, v_description, v_parent_forum_section_id, v_house_id, v_help);

    SELECT JSON_OBJECT(
        'forum_section_id',  forum_section_id,
        'name', name,
        'description', description,
        'parent_forum_section_id', parent_forum_section_id,
        'house',  getHouseJSON(house_id),
        'access_level', access_level,
        'help_section', help_section
    ) as result FROM forum_section WHERE forum_section_id = LAST_INSERT_ID();
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertSubject` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `insertSubject`(v_name VARCHAR(100), v_forum_section_id INT, v_user_id INT)
BEGIN
	START TRANSACTION;
		INSERT INTO forum_subject (name, created, forum_section_id, user_id) VALUES
        (v_name, now(), v_forum_section_id, v_user_id);
        SELECT JSON_OBJECT(
        'forum_subject_id',  forum_subject_id,
        'name', name,
        'created', created,
        'forum_section_id', forum_section_id,
        'creator',  getUserJSON(user_id)
    ) as result FROM forum_subject WHERE forum_subject_id = LAST_INSERT_ID();
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `insertUser`(IN v_birth datetime, IN v_email varchar(255), IN v_firstname varchar(255),
                                            IN v_lastname varchar(255), IN v_password varchar(255), IN v_house_id int)
BEGIN
	START TRANSACTION;
	INSERT INTO user (active, birth, created, email, firstname, lastname, last_online, password, house_id, role_id, status_id)
	VALUES (1, v_birth, NOW(), v_email, v_firstname, v_lastname, NOW(), v_password, v_house_id, 1, 1);
    
	SELECT getUserJSON(LAST_INSERT_ID()) as result;
    COMMIT;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `joinEvent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `joinEvent`(v_user_id int, v_event_id int)
BEGIN
	INSERT INTO user_participate_event (user_id, event_id)
		VALUES (v_user_id, v_event_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `listForumsByParent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `listForumsByParent`(IN v_parent_id INT, IN v_access_level INT, IN v_house_id INT, OUT v_out JSON)
proc:BEGIN

        DECLARE v_i INT DEFAULT 0;
        DECLARE v_nb INT DEFAULT 0;
        DECLARE v_current JSON;
        DECLARE current_forum_id INT;

        DECLARE v_forums JSON DEFAULT (SELECT json_arrayagg(JSON_OBJECT(
            'forum_section_id', forum_section_id,
            'name', name,
            'description', description,
            'parent_forum_section_id', parent_forum_section_id,
            'house_id', house_id,
            'access_level', access_level,
            'help_section', help_section,
            'subjects', getSubjectsJSON(forum_section_id)
            ))
            FROM forum_section
            WHERE (((v_parent_id IS NULL AND parent_forum_section_id IS NULL) OR parent_forum_section_id = v_parent_id) 
            AND (v_access_level >= 75 OR (v_access_level >= 50) OR (v_access_level >= access_level AND (house_id = v_house_id OR house_id IS NULL))))

        );

		SET max_sp_recursion_depth=255;
        IF v_out IS NULL THEN
            SET v_out = v_forums;
        END IF;

        SET v_nb = JSON_LENGTH(v_forums);
        IF v_nb > 0 THEN
            REPEAT
                SET current_forum_id = JSON_EXTRACT(v_out, CONCAT("$[", v_i, "].forum_section_id"));
                    SET v_current = NULL;
                    # Appel rÃ©cursif pour chercher les enfants du forum courant
                    CALL listForumsByParent(current_forum_id, v_access_level, v_house_id, v_current);
                    SET v_out = JSON_INSERT(v_out, CONCAT('$[', v_i, '].forums'), v_current);
                    SET v_current = NULL;
                SET v_i = v_i + 1;
                UNTIL v_i = v_nb
           END REPEAT;
        END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `quitEvent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `quitEvent`(v_user_id int, v_event_id int)
BEGIN
	DELETE FROM user_participate_event
    WHERE event_id = v_event_id AND user_id = v_user_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `unanswerPost` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `unanswerPost`(IN v_post_id INT)
BEGIN
	UPDATE forum_post SET subject_answer = 0 WHERE forum_post_id = v_post_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `unanswerSubject` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `unanswerSubject`(IN v_subject_id INT)
BEGIN
	UPDATE forum_subject SET resolved = 0 WHERE forum_subject_id = v_subject_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateEvent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `updateEvent`(IN v_event_id int,
								IN v_name varchar(45),
								IN v_description mediumtext,
								IN v_is_competitive int,
								IN v_battleroyale int,
								IN v_difficulty int,
								IN v_price int,
								IN v_attendees_min int,
								IN v_attendees_max int,
								IN v_deadline_reservation datetime,
								IN v_date_begin datetime,
								IN v_date_end datetime,
								IN v_location mediumtext,
								IN v_address varchar(256),
								IN v_house_id int)
BEGIN
	START TRANSACTION;
    UPDATE event
    SET name = v_name,
		description = v_description,
		is_competitive = v_is_competitive,
		difficulty = v_difficulty,
		battleroyale = v_battleroyale,
		status = v_status,
		price = v_price,
		attendees_min = v_attendees_min,
		attendees_max = v_attendees_max,
		created = v_created,
		deadline_reservation = v_deadline_reservation,
		date_begin = v_date_begin,
		date_end = v_date_end,
		location = v_location,
		address = v_address,
		house_id = v_house_id
    WHERE event_id = v_event_id;
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updatePost` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `updatePost`(IN v_message varchar(45), IN v_post_id int)
BEGIN
    START TRANSACTION ;
    UPDATE forum_post
    SET message = v_message, last_update = NOW()
    WHERE forum_post_id = v_post_id;
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateSection` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `updateSection`(IN v_name varchar(100), IN v_description mediumtext, IN v_section_id int)
BEGIN
    START TRANSACTION ;
    UPDATE forum_section
    SET name = v_name, description = v_description
    WHERE forum_section_id = v_section_id;

    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateSubject` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `updateSubject`(IN v_name varchar(100), IN v_subject_id int)
BEGIN
    START TRANSACTION ;
    UPDATE forum_subject
    SET name = v_name
    WHERE forum_subject_id = v_subject_id;
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateUserAvatar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `updateUserAvatar`(IN v_user_id int, IN v_avatar mediumtext)
BEGIN
	START TRANSACTION ;
    UPDATE user
    SET avatar = v_avatar
    WHERE user_id = v_user_id;
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateUserPassword` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `updateUserPassword`(IN v_user_id int, IN v_password varchar(255))
BEGIN
	START TRANSACTION ;
    UPDATE user
    SET password = v_password
    WHERE user_id = v_user_id;
    COMMIT;
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

-- Dump completed on 2020-05-15 12:53:56
