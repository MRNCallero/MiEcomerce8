CREATE DATABASE  IF NOT EXISTS `miEcommerce` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `miEcommerce`;
-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 26-09-2022 a las 21:22:02
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `miEcomerce`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Cart`
--
DROP TABLE IF EXISTS `Cart`;
CREATE TABLE IF NOT EXISTS `Cart` (
  `id_user` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `date` date NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Cart`
--

INSERT INTO `Cart` (`id_user`, `id_product`, `date`, `quantity`) VALUES
(1, 2, '2022-09-02', 3),
(1, 3, '2022-05-02', 4),
(1, 1, '2022-03-02', 5),
(1, 5, '2022-02-20', 4),
(2, 2, '2022-09-04', 7),
(2, 4, '2022-09-14', 6),
(2, 8, '2022-09-04', 1),
(2, 3, '2022-09-04', 3),
(2, 5, '2022-09-04', 5);


--
-- Estructura de tabla para la tabla `Picture`
--
DROP TABLE IF EXISTS `Picture`;
CREATE TABLE IF NOT EXISTS `Picture` (
  `id` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Picture`
--

INSERT INTO  `Picture` (`id`, `id_product`, `url`, `description`) VALUES
(1, 1, 'https://images-ti-vm1.tiendainglesa.com.uy/large/P378685-1.jpg?20210423152203,Galleta-OREO-117-gr-en-Tienda-Inglesa', 'Imagen envoltorio'),
(2, 1, 'https://cordis.europa.eu/docs/news/images/2022-04/436329.jpg', 'Imagen galleta'),
(3, 2, 'https://geant.vteximg.com.br/arquivos/ids/202287-700-700/740074.jpg?v=636371955347400000', 'Imagen envoltorio'),
(4, 2, 'https://imagenes.montevideo.com.uy/imgnoticias/201208/_H571_90/371993.jpg', 'Imagen galleta'),
(5, 3, 'https://geant.vteximg.com.br/arquivos/ids/193696-1000-1000/742195.jpg?v=636304563148000000', 'Imagen envoltorio'),
(6, 3, 'https://img-global.cpcdn.com/recipes/c4c6bbff3c38a9a4/1200x630cq70/photo.jpg', 'Imagen galleta'),
(7, 4, 'https://geant.vteximg.com.br/arquivos/ids/284709-1000-1000/210276.jpg?v=637679392009230000', 'Imagen alfajor'),
(8, 5, 'https://static.tingelmar.com/app/uy/negocios/icono/big/i43038-119571431.webp', NULL),
(9, 6, 'https://images-ti-vm1.tiendainglesa.com.uy/large/P373281-1.jpg?20170830115843,Alfajor-de-Chocolate-MARLEY-70g-en-Tienda-Inglesa', 'foto del mejor alfajor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Product`
--
DROP TABLE IF EXISTS `Product`;

CREATE TABLE IF NOT EXISTS `Product` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `mostwanted` tinyint(1) NOT NULL DEFAULT '0',
  `stock` int(11) NOT NULL DEFAULT 0,
  `description` varchar(255) DEFAULT NULL,
  `id_category` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Product`
--

INSERT INTO `Product` (`id`, `title`, `price`, `mostwanted`, `stock`, `description`, `id_category`) VALUES
(1, 'Oreo', 150, 1, 10, 'Galletas de chocolate', 3),
(2, 'Lulu', 130, 0, 20, 'Galletas de vainilla', 3),
(3, '9 DE ORO', 100, 0, 25, 'Las mejores galletas del mercado', 3),
(4, 'Portezuelo', 60, 0, 30, 'Portezuelo Rojo', 2),
(5, 'Cierra de Mina', 130, 1, 20, 'Chocolate negro', 2),
(6, 'Marley', 170, 0, 20, 'Chocolate blanco', 2),
(7, 'Coca-Cola', 70, 0, 40, 'Sin Azucar', 1),
(8, 'Sprite', 60, 1, 45, 'Con mucho azucar', 1),
(9, 'Agua', 40, 1, 20, 'La mejor bebida', 1),
(10, 'Fabuloso', 175, 0, 20, 'Olor Lavanda', 4),
(11, 'Mister Musculo Grasa', 150, 0, 25, 'Sin Olor', 4),
(12, 'Mister Musculo Aceite', 125, 1, 25, 'Olor Menta', 4),
(13, 'Batidora', 100, 1, 25, 'Motor con dos velocidades', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `User`
--
DROP TABLE IF EXISTS `User`;

CREATE TABLE IF NOT EXISTS `User` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `profilepic` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'GUEST'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `User`
--

INSERT INTO `User` (`id`, `email`, `username`, `password`, `first_name`, `last_name`, `profilepic`, `role`) VALUES
(1, 'god@god.com', 'god', 'god', 'Diosito', 'TodoPoderoso', 'https://media.istockphoto.com/photos/hands-of-god-picture-id157377707?k=20&m=157377707&s=612x612&w=0&h=K-dH2tCJGpQONcmvauRMeVnm-r5QdL4NipRDokHXukI=', 'GOD'),
(2, 'admin@admin.com', 'Admin', 'Admin', 'ElAdmin', 'NoTanPoderoso', 'https://media.istockphoto.com/vectors/administrative-professionals-day-secretaries-day-or-admin-day-holiday-vector-id1204416887?k=20&m=1204416887&s=612x612&w=0&h=tI6AmIGHRBv8NdL2KJHvHOtQ9nBhzAnX5yhmVNqrf-0=', 'ADMIN');


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Category`
--
DROP TABLE IF EXISTS `Category`;
CREATE TABLE IF NOT EXISTS `Category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Category`
--

INSERT INTO `Category` (`id`, `name`) VALUES
(1, 'Bebida'),
(2, 'Alfajores'),
(3, 'Galletas'),
(4, 'Producto Cocina');

-- --------------------------------------------------------
--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Cart`
--
ALTER TABLE `Cart`
  ADD KEY `Cart_fk0` (`id_user`),
  ADD KEY `Cart_fk1` (`id_product`);

--
-- Indices de la tabla `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Picture`
--
ALTER TABLE `Picture`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Picture_fk0` (`id_product`);

--
-- Indices de la tabla `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Product_fk0` (`id_category`);

--
-- Indices de la tabla `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Category`
--
ALTER TABLE `Category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `Picture`
--
ALTER TABLE `Picture`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `Product`
--
ALTER TABLE `Product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Cart`
--
ALTER TABLE `Cart`
  ADD CONSTRAINT `Cart_fk0` FOREIGN KEY (`id_user`) REFERENCES `User` (`id`),
  ADD CONSTRAINT `Cart_fk1` FOREIGN KEY (`id_product`) REFERENCES `Product` (`id`);

--
-- Filtros para la tabla `Picture`
--
ALTER TABLE `Picture`
  ADD CONSTRAINT `Picture_fk0` FOREIGN KEY (`id_product`) REFERENCES `Product` (`id`);

--
-- Filtros para la tabla `Product`
--
ALTER TABLE `Product`
  ADD CONSTRAINT `Product_fk0` FOREIGN KEY (`id_category`) REFERENCES `Category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
