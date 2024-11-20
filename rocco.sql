DROP DATABASE IF EXISTS geo_cache;
CREATE DATABASE geo_cache;
USE geo_cache;

CREATE TABLE Visitors (
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO Visitors (name) VALUES ("Rocco");

SELECT *
FROM Visitors;