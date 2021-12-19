CREATE TABLE contactos(
    id INT (11) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) UNIQUE,
    apellido VARCHAR(20),
    correo_electronico VARCHAR(30),    
    telefono VARCHAR(11)
);