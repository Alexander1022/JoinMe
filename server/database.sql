CREATE DATABASE JoinMe;

-- user table for user in JoinMe

CREATE TABLE JoinMeUser(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    middle_name VARCHAR(120) NOT NULL,
    nickname VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL,
    password_user VARCHAR(80) NOT NULL,
    age NUMERIC NOT NULL,
    joiners NUMERIC NOT NULL,
    createdAt DATE NOT NULL DEFAULT CURRENT_DATE
);