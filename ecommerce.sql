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
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `id` int NOT NULL,
  `nama` varchar(45) NOT NULL,
  `image` varchar(90) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=179 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartlist`
--

DROP TABLE IF EXISTS `cartlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartlist` (
  `idproduct` int NOT NULL,
  `idcart` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartlist`
--

LOCK TABLES `cartlist` WRITE;
/*!40000 ALTER TABLE `cartlist` DISABLE KEYS */;
INSERT INTO `cartlist` VALUES (1,1),(2,2),(2,2);
/*!40000 ALTER TABLE `cartlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_name` varchar(45) NOT NULL,
  `quantity` int NOT NULL,
  `total_price` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (2,30,'FLOWING BOMBER JACKET',1,100000),(3,30,'THE DEVIL WEARS PRADA',2,344444),(4,30,'Kaos',2,11111);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jenis` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (16,'Jaket');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=171 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daftarorder`
--

LOCK TABLES `daftarorder` WRITE;
/*!40000 ALTER TABLE `daftarorder` DISABLE KEYS */;
INSERT INTO `daftarorder` VALUES (169,'fahmi','2020-02-21',18000000,1,'2020221132749','Pending','hello.fahmihassan@gmail.com'),(170,'fahmi','2020-02-21',18000000,1,'2020221132752','Pending','hello.fahmihassan@gmail.com');
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
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detailorder`
--

LOCK TABLES `detailorder` WRITE;
/*!40000 ALTER TABLE `detailorder` DISABLE KEYS */;
INSERT INTO `detailorder` VALUES (135,148,2,1),(136,148,12,1),(139,151,22,1),(140,152,24,1),(149,157,26,1),(150,157,22,1),(167,169,23,1),(168,170,23,1);
/*!40000 ALTER TABLE `detailorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `joinproduct`
--

DROP TABLE IF EXISTS `joinproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `joinproduct` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product` varchar(99) NOT NULL,
  `category` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `joinproduct`
--

LOCK TABLES `joinproduct` WRITE;
/*!40000 ALTER TABLE `joinproduct` DISABLE KEYS */;
INSERT INTO `joinproduct` VALUES (14,'FLOWING BOMBER JACKET','Jaket');
/*!40000 ALTER TABLE `joinproduct` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `konfirmasiorder`
--

LOCK TABLES `konfirmasiorder` WRITE;
/*!40000 ALTER TABLE `konfirmasiorder` DISABLE KEYS */;
INSERT INTO `konfirmasiorder` VALUES (38,'budiyarto','2019314152410','/products/confirmtrx/TRX1552551934240.png'),(39,'budiyarto','2019314152837','/products/confirmtrx/TRX1552552153769.png'),(40,'budiyarto','2019314161130','/products/confirmtrx/TRX1552554731895.jpg'),(41,'budiyarto','2019315143347','/products/confirmtrx/TRX1552635309844.jpg');
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (22,'iPhone X 64GB',17000000,'/products/gambar/PRO1552393594002.jpg','Display 5.8-inch  OS  iOS 12  Battery  2716mAh  Chip A11 Bionic chip with 64-bit architecture Neural Engine  3 GB RAM'),(23,'iPhone XR 64GB',18000000,'/products/gambar/PRO1552392075731.jpg','Display 6.1-inch  OS  iOS 12  Battery  2942mAh  Chip A12 Bionic chip with 64-bit architecture Neural Engine  3 GB RAM'),(24,'iPhone XS 64GB',19000000,'/products/gambar/PRO1552392124889.jpeg','Display 5.8-inch  OS  iOS 12  Battery  2658mAh  Chip A12 Bionic chip with 64-bit architecture Neural Engine  4 GB RAM  Camera Main: 12MP dual camera with wide-angle and telephoto cameras Wide-angle: ƒ/1.8 aperture Telephoto: ƒ/2.4 aperture Selfie: 7MP'),(26,'Apple Watch',5500000,'/products/gambar/PRO1552394075141.jpg','Display 1.78-inch  OS  WatchOS 05  Battery  Non-removable Li-Ion battery stand by up to 18 hours  Chip Apple S4 Power VR'),(27,'iPad Pro 2018',13000000,'/products/gambar/PRO1552394129881.jpg','Display 12.9-inch  OS  iOS 12  Battery  9720mAh  Chip A12X Bionic chip with 64-bit architecture Neural Engine  6 GB RAM  Camera Main: 12MP  Wide-angle: ƒ/1.8 aperture Selfie: 7MP'),(33,'iPad Pro 2018 1TB',16000000,'/products/gambar/PRO1552496489758.jpg','Display 12.9-inch OS iOS 12 Battery 9720mAh Chip A12X Bionic chip with 64-bit architecture Neural Engine 6 GB RAM Camera Main: 12MP Wide-angle: ƒ/1.8 aperture Selfie: 7MP'),(34,'iPhone X 256GB',18000000,'/products/gambar/PRO1552496549686.jpg','Display 5.8-inch OS iOS 12 Battery 2716mAh Chip A11 Bionic chip with 64-bit architecture Neural Engine 3 GB RAM'),(35,'iPhone XS 256GB',20000000,'/products/gambar/PRO1552496599526.jpeg','	Display 5.8-inch OS iOS 12 Battery 2658mAh Chip A12 Bionic chip with 64-bit architecture Neural Engine 4 GB RAM Camera Main: 12MP dual camera with wide-angle and telephoto cameras Wide-angle: ƒ/1.8 aperture Telephoto: ƒ/2.4 aperture Selfie: 7MP');
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
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (40,'aha','b3887e3170fd3e44225163028f37a120339aaf7ce32200eeb14afea33b60f28e','hello.fahmihassan@gmail.com','Verified','SUPERADMIN'),(41,'admin','16d2a2143342bbda8a189324c15e9b6b9b583f2ce479e4a4d4e39c97559c3056','hello.fahmihassan@gmail.com','Verified','SUPERADMIN'),(42,'payment','2a1342c78fc6cef3008acbbf62653f2927cc437f62dbe0e00351f5682aa051cd','hello.fahmihassan@gmail.com','Verified','ADMIN PAYMENT'),(43,'editor','44b3c37f39a96527e69d81cd73988675a15642ee7791350bb7e524e8689cfd43','hello.fahmihassan@gmail.com','Verified','EDITOR'),(45,'fahmi','9f6efc2714854c2602e08c51ed767c06719148c1188f371fa19e731b8b5cdf69','hello.fahmihassan@gmail.com','Verified','MEMBER'),(46,'yusuf','ea05a12fa6f34705f83014993c26111fb01578a5bfdd74a12515fb277989da10','hello.fahmihassan@gmail.com','Verified','MEMBER'),(47,'adrien','0eb0c591a7d5699321fd2f18cb74d7737ef0a4ff3e1be1d42a9056f911f89ef4','hello.fahmihassan@gmail.com','Unverified','MEMBER'),(49,'fahmihassan','408f8fdce0ce8fcba4e8cfb91b7141278f1fcc4308957fd47e75a60c626148c7','hello.fahmihassan@gmail.com','Verified','SUPERADMIN'),(50,'fahmihassan1','551b1540773113d830e58b18ff57f78f618671767baa9004c2cefe6e78049ba3','email.punya.fahmi@gmail.com','Verified','MEMBER'),(51,'user','d6e1e98be20791c730a9293a92b8979376983ff7b80747f6d35a30afd165a428','fahmi_love.rock@yahoo.com','Verified','MEMBER'),(52,'user','d6e1e98be20791c730a9293a92b8979376983ff7b80747f6d35a30afd165a428','hello.fahmihassan@gmail.com','Verified','MEMBER'),(53,'test1','2d9cbce416ba97446c200861ef002715b9f5aca73beaf07f849f94d6d0afe574','fahmi_love.rock@yahoo.com','Verified','SUPERADMIN');
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
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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

-- Dump completed on 2020-02-21 13:43:57
