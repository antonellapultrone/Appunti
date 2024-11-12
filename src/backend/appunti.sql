CREATE DATABASE appunti;

CREATE TABLE reservas (
    ID INT PRIMARY KEY,
    Servicio INT,
    Cliente INT,
    Estado BOOLEAN
);

CREATE TABLE imagenes (
    ID INT PRIMARY KEY,
    Servicio INT,
    Imagen VARCHAR(255)
);

CREATE TABLE favoritos (
    usuario INT,
    servicio INT,
    PRIMARY KEY (usuario, servicio)
);

CREATE TABLE usuario_emprendedor (
    ID INT PRIMARY KEY,
    mail VARCHAR(255),
    contraseña VARCHAR(255),
    servicio INT,
    telefono VARCHAR(20)
);

CREATE TABLE servicio (
    ID INT PRIMARY KEY,
    nombre VARCHAR(255),
    precio DECIMAL(10, 2),
    descripcion TEXT,
    categoria VARCHAR(100),
    ubicacion VARCHAR(255),
    imagenes TEXT,
    horario TIME,
    telefono VARCHAR(15),
    horas VARCHAR(100),
    fecha DATE,
    administrador VARCHAR(100)
);

CREATE TABLE usuario_cliente (
    ID INT PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    mail VARCHAR(255) UNIQUE,
    contraseña VARCHAR(255),
    foto VARCHAR(255),
    reservas VARCHAR(255),
    favoritos VARCHAR(255),
    barrio VARCHAR(100)
);