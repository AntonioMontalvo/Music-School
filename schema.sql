/* This file is to help setting up our SQL satabase.*/

/* Create and use our  db */
CREATE DATABASE  `School_Info`;
USE `School_Info`;

/* Create a table for all contacts */
CREATE TABLE `contacts` (
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`first_name` VARCHAR(25) NOT NULL,
	`last_name` VARCHAR(25) NOT NULL,
	`date_of_birth` DATE NOT NULL,
	`phone` VARCHAR(12) NOT NULL,
	`email` VARCHAR(100) NOT NULL,
	`num_of_lesson` INT(100) NOT NULL,
	`level` INT(3) NOT NULL,
	`date_created` DATE NOT NULL,

	PRIMARY KEY ( `id` ) ); /* Set ID as primary key */

/* Add mock data to the table for testing */

INSERT INTO contacts(first_name, last_name, date_of_birth, phone, email, num_of_lessons, level, date_created)
    -> VALUES ('John', 'Smith', '2005-10-01', '8189989909', 'js@google.com', '3', '1', '2018-06-12');


