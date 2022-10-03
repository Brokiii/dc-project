CREATE DATABASE insurance;

use insurance;

CREATE TABLE Test(
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);

INSERT INTO Test(PersonID, LastName, FirstName, Address, City) VALUES(1, "aa", "aaa", "aaaa", "aaaaaa");