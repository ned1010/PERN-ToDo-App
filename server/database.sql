CREATE DATABASE pern_todo;

CREATE TABLE todo (
  id SERIAL PRIMARY KEY,
  text VARCHAR(255)
);