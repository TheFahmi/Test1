-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ecommerce
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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `kuantiti` int NOT NULL,
  `total_harga` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=245 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (244,45,24,1,19000000);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daftarorder`
--

DROP TABLE IF EXISTS `daftarorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `daftarorder` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(55) NOT NULL,
  `date` date NOT NULL,
  `totalprice` int NOT NULL,
  `totalquantity` int NOT NULL,
  `invoice` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=236 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daftarorder`
--

LOCK TABLES `daftarorder` WRITE;
/*!40000 ALTER TABLE `daftarorder` DISABLE KEYS */;
INSERT INTO `daftarorder` VALUES (230,'fahmi','2020-03-12',18000000,1,'INV-202031218152-236','unpaid','hello.fahmihassan@gmail.com'),(231,'fahmi','2020-03-12',90000000,5,'INV-2020312181940-237','sent','hello.fahmihassan@gmail.com'),(232,'fahmi','2020-03-12',16000000,1,'INV-2020312181940-237','pending','hello.fahmihassan@gmail.com'),(233,'user','2020-03-12',85000000,5,'INV-2020312193752-239','sent','fahmi_love.rock@yahoo.com'),(234,'fahmi','2020-03-13',20000000,1,'INV-202031395616-240','unpaid','hello.fahmihassan@gmail.com'),(235,'fahmi','2020-03-13',180660655,6,'INV-2020313104211-240','sent','hello.fahmihassan@gmail.com');
/*!40000 ALTER TABLE `daftarorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detailorder`
--

DROP TABLE IF EXISTS `detailorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detailorder` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idtrx` int NOT NULL,
  `idproduct` int NOT NULL,
  `qty` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=232 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detailorder`
--

LOCK TABLES `detailorder` WRITE;
/*!40000 ALTER TABLE `detailorder` DISABLE KEYS */;
INSERT INTO `detailorder` VALUES (226,230,23,1),(227,231,23,5),(228,232,33,1),(229,233,22,5),(230,235,35,1),(231,235,37,5);
/*!40000 ALTER TABLE `detailorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `konfirmasiorder`
--

DROP TABLE IF EXISTS `konfirmasiorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `konfirmasiorder` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `invoice` varchar(90) NOT NULL,
  `image` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `konfirmasiorder`
--

LOCK TABLES `konfirmasiorder` WRITE;
/*!40000 ALTER TABLE `konfirmasiorder` DISABLE KEYS */;
INSERT INTO `konfirmasiorder` VALUES (80,'fahmi','INV-20203121818-235','/products/confirmtrx/TRX1584011832549.jpg'),(81,'fahmi','INV-2020312181940-237','/products/confirmtrx/TRX1584012024535.jpg'),(82,'fahmi','INV-2020312184051-238','/products/confirmtrx/TRX1584013277552.jpg'),(83,'user','INV-2020312193752-239','/products/confirmtrx/TRX1584016745086.png'),(84,'fahmi','INV-2020313104211-240','/products/confirmtrx/TRX1584070959518.png');
/*!40000 ALTER TABLE `konfirmasiorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(150) NOT NULL,
  `harga` int NOT NULL,
  `image` varchar(150) NOT NULL,
  `deskripsi` varchar(600) NOT NULL,
  `idcategory` int NOT NULL,
  `stok` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (22,'iPhone X 64GB',17000000,'/products/gambar/PRO1552393594002.jpg','Display 5.8-inch  OS  iOS 12  Battery  2716mAh  Chip A11 Bionic chip with 64-bit architecture Neural Engine  3 GB RAM',0,2),(23,'iPhone XR 64GB',18000000,'/products/gambar/PRO1552392075731.jpg','Display 6.1-inch  OS  iOS 12  Battery  2942mAh  Chip A12 Bionic chip with 64-bit architecture Neural Engine  3 GB RAM',0,0),(24,'iPhone XS 64GB',19000000,'/products/gambar/PRO1552392124889.jpeg','Display 5.8-inch  OS  iOS 12  Battery  2658mAh  Chip A12 Bionic chip with 64-bit architecture Neural Engine  4 GB RAM  Camera Main: 12MP dual camera with wide-angle and telephoto cameras Wide-angle: ƒ/1.8 aperture Telephoto: ƒ/2.4 aperture Selfie: 7MP',0,0),(26,'Apple Watch',5500000,'/products/gambar/PRO1552394075141.jpg','Display 1.78-inch  OS  WatchOS 05  Battery  Non-removable Li-Ion battery stand by up to 18 hours  Chip Apple S4 Power VR',0,0),(27,'iPad Pro 2018',13000000,'/products/gambar/PRO1552394129881.jpg','Display 12.9-inch  OS  iOS 12  Battery  9720mAh  Chip A12X Bionic chip with 64-bit architecture Neural Engine  6 GB RAM  Camera Main: 12MP  Wide-angle: ƒ/1.8 aperture Selfie: 7MP',0,0),(33,'iPad Pro 2018 1TB',16000000,'/products/gambar/PRO1552496489758.jpg','Display 12.9-inch OS iOS 12 Battery 9720mAh Chip A12X Bionic chip with 64-bit architecture Neural Engine 6 GB RAM Camera Main: 12MP Wide-angle: ƒ/1.8 aperture Selfie: 7MP',0,0),(34,'iPhone X 256GB',18000000,'/products/gambar/PRO1552496549686.jpg','Display 5.8-inch OS iOS 12 Battery 2716mAh Chip A11 Bionic chip with 64-bit architecture Neural Engine 3 GB RAM',0,0),(35,'iPhone XS 256GB',20000000,'/products/gambar/PRO1552496599526.jpeg','	Display 5.8-inch OS iOS 12 Battery 2658mAh Chip A12 Bionic chip with 64-bit architecture Neural Engine 4 GB RAM Camera Main: 12MP dual camera with wide-angle and telephoto cameras Wide-angle: ƒ/1.8 aperture Telephoto: ƒ/2.4 aperture Selfie: 7MP',0,0),(37,'dsadsa',32132131,'/products/gambar/PRO1583827446694.jpg','fdsfdsfsd',0,0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(90) NOT NULL,
  `email` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (40,'aha','b3887e3170fd3e44225163028f37a120339aaf7ce32200eeb14afea33b60f28e','hello.fahmihassan@gmail.com','Verified','SUPERADMIN'),(41,'admin','16d2a2143342bbda8a189324c15e9b6b9b583f2ce479e4a4d4e39c97559c3056','hello.fahmihassan@gmail.com','Verified','SUPERADMIN'),(42,'payment','2a1342c78fc6cef3008acbbf62653f2927cc437f62dbe0e00351f5682aa051cd','hello.fahmihassan@gmail.com','Verified','ADMIN PAYMENT'),(43,'editor','44b3c37f39a96527e69d81cd73988675a15642ee7791350bb7e524e8689cfd43','hello.fahmihassan@gmail.com','Verified','EDITOR'),(45,'fahmi','9f6efc2714854c2602e08c51ed767c06719148c1188f371fa19e731b8b5cdf69','hello.fahmihassan@gmail.com','Verified','MEMBER'),(46,'yusuf','ea05a12fa6f34705f83014993c26111fb01578a5bfdd74a12515fb277989da10','hello.fahmihassan@gmail.com','Verified','MEMBER'),(47,'adrien','9a1c7fd09985668da8b59c7ed46d120124bb8e9a4fa2df4fc74d0f06df7a1d16','hello.fahmihassan@gmail.com','Verified','MEMBER'),(49,'fahmihassan','408f8fdce0ce8fcba4e8cfb91b7141278f1fcc4308957fd47e75a60c626148c7','hello.fahmihassan@gmail.com','Verified','SUPERADMIN'),(50,'fahmihassan1','551b1540773113d830e58b18ff57f78f618671767baa9004c2cefe6e78049ba3','email.punya.fahmi@gmail.com','Verified','MEMBER'),(51,'user','145ba010c37bdaffc608add192b92f04643222e057921e5b1a96727728115b6f','hello.fahmihassan@gmail.com','Verified','MEMBER'),(52,'user','d6e1e98be20791c730a9293a92b8979376983ff7b80747f6d35a30afd165a428','hello.fahmihassan@gmail.com','Verified','MEMBER'),(53,'test1','2d9cbce416ba97446c200861ef002715b9f5aca73beaf07f849f94d6d0afe574','fahmi_love.rock@yahoo.com','Verified','SUPERADMIN'),(54,'fahmi123','9f6efc2714854c2602e08c51ed767c06719148c1188f371fa19e731b8b5cdf69','hello.fahmihassan@gmail.com','Verified','MEMBER'),(56,'fadi','dfba8f69b67db339d932d4949978ca7468f7bce2caca461de5bc64d78c4f82a7','hello.fahmihassan@gmail.com','Verified','SUPERADMIN'),(57,'test123','9f6efc2714854c2602e08c51ed767c06719148c1188f371fa19e731b8b5cdf69','hello.fahmihassan@gmail.com','UNVERIFIED','MEMBER'),(58,'hu','20851cb078cc798be75e03418db37049f9a5604c86610a86dcf9261cc6f5fcb0','hello.fahmihassan@gmail.com','Verified','SUPERADMIN');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-14 10:49:42
