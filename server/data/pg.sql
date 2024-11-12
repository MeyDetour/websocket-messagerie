-- Si le schéma 'persons' n'existe pas, créez-le
DROP SCHEMA IF EXISTS persons;
CREATE SCHEMA persons;
SET search_path TO persons;

-- Création de la table 'users'
CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       name VARCHAR NOT NULL,
                       email VARCHAR UNIQUE NOT NULL,
                       password VARCHAR NOT NULL
);

-- Insertion d'exemples d'utilisateurs
INSERT INTO users (name, email, password) VALUES
                                              ('John Doe', 'john.doe@example.com', 'password123'),
                                              ('Jane Smith', 'jane.smith@example.com', 'securepass'),
                                              ('Alice Brown', 'alice.brown@example.com', 'alicepass');
