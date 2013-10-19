CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (id int(11) NOT NULL auto_increment, chatText varchar(255), uID int(11), rID int(11), PRIMARY KEY(id));

CREATE TABLE users (id int(11) NOT NULL auto_increment, name varchar(100), rID int(11), PRIMARY KEY(id));

CREATE TABLE rooms (id int(11) NOT NULL auto_increment, name varchar(100), PRIMARY KEY(id));

CREATE TABLE users_users (id int(11) NOT NULL auto_increment, userOneId int(11), userTwoId int(11), PRIMARY KEY(id));

/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
