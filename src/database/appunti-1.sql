
CREATE DATABASE IF NOT EXISTS `appunti`;
USE `appunti` ;

CREATE TABLE IF NOT EXISTS `appunti`.`favoritos` (
  ID INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`),
  `usuario_ID` INT NOT NULL,
  `servicio_ID` INT NOT NULL,
  FOREIGN KEY (`usuario_ID`) REFERENCES `usuario`(`ID`) ON DELETE CASCADE,
  FOREIGN KEY (`servicio_ID`) REFERENCES `servicio`(`ID`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `appunti`.`imagenes` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Imagen` VARCHAR(255) NULL DEFAULT NULL,
  `servicio_ID` INT NOT NULL,
  PRIMARY KEY (`ID`),
  FOREIGN KEY (`servicio_ID`) REFERENCES `servicio`(`ID`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `appunti`.`reservas` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Estado` TINYINT(1) NULL DEFAULT NULL,
  `usuario_ID` INT NOT NULL,  -- Asegúrate de que esta columna exista
  `servicio_ID` INT NOT NULL, -- Asegúrate de que esta columna exista
  PRIMARY KEY (`ID`),
  FOREIGN KEY (`usuario_ID`) REFERENCES `usuario`(`ID`) ON DELETE CASCADE,
  FOREIGN KEY (`servicio_ID`) REFERENCES `servicio`(`ID`) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS `appunti`.`servicios` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  `precio` DECIMAL(10,2) NULL DEFAULT NULL,
  `descripcion` TEXT NULL DEFAULT NULL,
  `categoria` VARCHAR(100) NULL DEFAULT NULL,
  `ubicacion` VARCHAR(255) NULL DEFAULT NULL,
  `imagenes` TEXT NULL DEFAULT NULL,
  `horario` TIME NULL DEFAULT NULL,
  `telefono` VARCHAR(15) NULL DEFAULT NULL,
  `horas` VARCHAR(100) NULL DEFAULT NULL,
  `fecha` DATE NULL DEFAULT NULL,
  `usuario_ID` INT NOT NULL,
  FOREIGN KEY (`usuario_ID`) REFERENCES `usuario`(`ID`) ON DELETE CASCADE,
  PRIMARY KEY (`ID`)
);

CREATE TABLE IF NOT EXISTS `appunti`.`usuarios` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  `apellido` VARCHAR(255) NULL DEFAULT NULL,
  `mail` VARCHAR(255) NULL DEFAULT NULL,
  `contrasenia` VARCHAR(255) NULL DEFAULT NULL,
  `foto` VARCHAR(255) NULL DEFAULT NULL,
  `direccion` VARCHAR(100) NULL DEFAULT NULL,
  `emprendimiento` BOOLEAN NULL DEFAULT FALSE,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `mail` (`mail` ASC) VISIBLE
);

