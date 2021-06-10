create database enrutate;
use enrutate;

CREATE TABLE `parada` (
  `paradaID` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  `latitud` dec(8,6) NOT NULL,
  `longitud` dec(9,6) NOT NULL,
  `estaActivo` tinyint(4) NOT NULL,
  `ciudadID` int(11) NOT NULL,
  PRIMARY KEY (`paradaID`)
) ;

CREATE TABLE `ruta` (
  `rutaID` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `inicio` varchar(45) NOT NULL,
  `fin` varchar(45) NOT NULL,
  `duracion` int(11) DEFAULT NULL,
  `frecuencia` int(11) DEFAULT NULL,
  `estaActivos` boolean NOT NULL,
  `ciudadID` int(11) NOT NULL,
  `tieneGPS` boolean NOT NULL,
  `tipoTransporte` int(11) DEFAULT NULL,
  `horaInicio` time DEFAULT NULL,
  `horaFin` time DEFAULT NULL,
  PRIMARY KEY (`rutaID`)
) ;

CREATE TABLE `rutaParada` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rutaID` int(11) NOT NULL,
  `paradaID` int(11) NOT NULL,
  `orden` varchar(45) NOT NULL,
  `estaActivo` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rutaID_idx` (`rutaID`),
  KEY `paradaID_idx` (`paradaID`),
  CONSTRAINT `paradaID` FOREIGN KEY (`paradaID`) REFERENCES `parada` (`paradaID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `rutaID` FOREIGN KEY (`rutaID`) REFERENCES `ruta` (`rutaID`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE `coordenadasRuta` (
  `coordenadasRutaID` INT NOT NULL AUTO_INCREMENT,
  `rutaID` INT NOT NULL,
  `latitud` dec(8,6) NOT NULL,
  `longitud` dec(9,6) NOT NULL,
  `orden` INT NOT NULL,
  `orientacion` INT NOT NULL,
  PRIMARY KEY (`coordenadasRutaID`)
  );