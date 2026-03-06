CREATE TABLE user (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO user (name, email) VALUES
('Alice', 'alice@example.com'),
('Bob', 'bob@example.com');
