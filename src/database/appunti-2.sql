CREATE DATABASE IF NOT EXISTS `appunti`;
USE `appunti` ;

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
  UNIQUE INDEX `mail` (`mail` ASC) 
);
CREATE TABLE IF NOT EXISTS `appunti`.`servicios` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `precio` DECIMAL(10,2) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `categoria` VARCHAR(100) NOT NULL,
  `direccion` VARCHAR(100) NULL,
  `ciudad` VARCHAR(100) NULL,
  `telefono` VARCHAR(15) NULL,
  `estado` ENUM('activo', 'pausado') DEFAULT 'activo',
  `usuario_ID` INT NOT NULL,
  FOREIGN KEY (`usuario_ID`) REFERENCES `usuarios`(`ID`) ON DELETE CASCADE,
  PRIMARY KEY (`ID`)
);

CREATE TABLE IF NOT EXISTS `appunti`.`favoritos` (
  ID INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`),
  `usuario_ID` INT NOT NULL,
  `servicio_ID` INT NOT NULL,
  FOREIGN KEY (`usuario_ID`) REFERENCES `usuarios`(`ID`) ON DELETE CASCADE,
  FOREIGN KEY (`servicio_ID`) REFERENCES `servicios`(`ID`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `appunti`.`imagenes` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(255) NOT NULL,
  `descripcion` VARCHAR(255) NULL,
  `servicio_ID` INT NOT NULL,
  PRIMARY KEY (`ID`),
  FOREIGN KEY (`servicio_ID`) REFERENCES `servicios`(`ID`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `appunti`.`reservas` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `fecha_reserva` DATE NOT NULL,
  `hora_inicio` TIME NOT NULL,
  `hora_fin` TIME NOT NULL,
  `estado` ENUM('pendiente', 'confirmada', 'cancelada', 'completada') DEFAULT 'pendiente',
  `usuario_ID` INT NOT NULL,
  `servicio_ID` INT NOT NULL,
  PRIMARY KEY (`ID`),
  FOREIGN KEY (`usuario_ID`) REFERENCES `usuarios`(`ID`) ON DELETE CASCADE,
  FOREIGN KEY (`servicio_ID`) REFERENCES `servicios`(`ID`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `appunti`.`horarios` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `dia_semana` ENUM('lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo') NOT NULL,
  `hora_inicio` TIME NOT NULL,
  `hora_fin` TIME NOT NULL,
  `servicio_ID` INT NOT NULL,
  PRIMARY KEY (`ID`),
  FOREIGN KEY (`servicio_ID`) REFERENCES `servicios`(`ID`) ON DELETE CASCADE
);