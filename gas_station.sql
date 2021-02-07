-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 07, 2021 at 11:04 AM
-- Server version: 8.0.23
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gas_station`
--

-- --------------------------------------------------------

--
-- Table structure for table `station`
--

CREATE TABLE `station` (
  `id` int NOT NULL,
  `name` varchar(256) NOT NULL,
  `address` varchar(256) NOT NULL,
  `phone` varchar(256) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `isActive` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `station`
--

INSERT INTO `station` (`id`, `name`, `address`, `phone`, `latitude`, `longitude`, `isActive`) VALUES
(1, 'Bomba Terpel', 'Via a Rio Frio, Tuluá, Valle del Cauca', '318316628', 4.087822, -76.215742, 1),
(2, 'EDS San Fernando', 'Riofrío-Trujllo #3 Oeste-2 a 3 Oeste-250,, Tuluá, Valle del Cauca', '3152106540', 4.087649, -76.215521, 1),
(3, 'Estacion de Gasolina', 'Dg. 23, Tuluá, Valle del Cauca', '3217574120', 4.097343, -76.208127, 1),
(4, 'Bomba de Gasolina', 'Tv. 12, Tuluá, Valle del Cauca', '3012301415', 4.094995, -76.203071, 1),
(5, 'Estacion de servicio el Prado', 'Cra. 20 #2541, Tuluá, Valle del Cauca', '2242612', 4.086822, -76.201457, 1),
(6, 'Esso', 'Cra. 20 #27a-28, Tuluá, Valle del Cauca', '2249998', 4.084477, -76.201979, 1),
(7, 'Terpel San Cristobal', 'Cl. 28, Tuluá, Valle del Cauca', '2305814', 4.081648, -76.195684, 1),
(8, 'Gas station Professionals', 'Cl. 34 #3177, Tuluá, Valle del Cauca', '2263540', 4.077729, -76.196227, 1),
(9, 'Esso El Pedregal', 'a 42-72, Cra 27A #42-2, Tuluá, Valle del Cauca', '3115478971', 4.068819, -76.197046, 1),
(10, 'Natural Gas Station', 'Cl. 42d, Tuluá, Valle del Cauca', '3102547310', 4.070043, -76.192967, 1),
(11, 'Estacion de servicio Texaco', 'Cl. 32, Cra. 40 #Esquina, Tuluá, Valle del Cauca', '2301415', 4.076881, -76.18898, 1),
(12, 'Terpel Tulua', 'Cl. 28, Tulua, Valle del Cauca', '3147896541', 4.084171, -76.186332, 1),
(13, 'Gasolinera verde', 'Cra. 30 #16a-16, Tuluá, Valle del Cauca', '3217456320', 4.089571, -76.191843, 1),
(14, 'Estacion De Servicio Biomax San Antonio', 'Cra. 30 #56 # 18, Bogotá', '2333344', 4.089731, -76.192014, 1),
(15, 'Gasolinera ESSO', 'a 29-104,, Cl. 18 #292, Tuluá, Valle del Cauca', '3226641837', 4.089853, -76.191598, 1),
(17, 'Gasolineria Terpel', 'a 30-106 Cl. 17 #302, Tuluá, Valle del Cauca', '3124501210', 4.090333, -76.190728, 1),
(18, 'Estacion De Servicio Terpel Entre Rios', 'Cra. 30 #163, Tuluá, Valle del Cauca', '3157412030', 4.090856, -76.190004, 1),
(19, 'Esso', 'Cr 40 Cl 13 Esquina, Tulua, Valle del Cauca', '2243078', 4.092181, -76.178804, 1),
(20, 'Gasolineria Mobil', 'a 40-80,, Cl. 13 #40-2, Tuluá, Valle del Cauca', '3105400010', 4.092037, -76.178721, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `name` varchar(256) NOT NULL,
  `dni` varchar(256) NOT NULL,
  `type` varchar(256) NOT NULL,
  `gender` varchar(256) NOT NULL,
  `nationality` varchar(256) NOT NULL,
  `phone` varchar(256) NOT NULL,
  `address` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `station`
--
ALTER TABLE `station`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `dni` (`dni`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `station`
--
ALTER TABLE `station`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
