CREATE DATABASE burg_db;
USE burg_db;

CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	ate BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);