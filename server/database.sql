CREATE DATABASE JoinMe;

-- user table for user in JoinMe

CREATE TABLE JoinMeUser(
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    nickname VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL,
    gender VARCHAR(6) NOT NULL,
    picture VARCHAR(250) NOT NULL,
    friendsCount NUMERIC NOT NULL,
    createdAt DATE NOT NULL DEFAULT CURRENT_DATE
);

-- friends table for user friendships in JoinMe

CREATE TABLE Friends(
    user_id int REFERENCES JoinMeUser (user_id) ON UPDATE CASCADE,
    friend_id int REFERENCES JoinMeUser (user_id) ON UPDATE CASCADE
);

-- place table for every place mentioned in JoinMe

CREATE TABLE Place(
    place_id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL
);

-- User - Events table 

CREATE TABLE UserEvents(
    user_id INT REFERENCES JoinMeUser (user_id) ON UPDATE CASCADE,
    place_id INT REFERENCES Place (place_id) ON UPDATE CASCADE,
    event_id VARCHAR(300) NOT NULL
);

CREATE TABLE MyFav(
    user_id INT REFERENCES JoinMeUser (user_id) ON UPDATE CASCADE,
    place_id INT REFERENCES Place (place_id) ON UPDATE CASCADE,
    event_id NUMERIC NOT NULL
);

