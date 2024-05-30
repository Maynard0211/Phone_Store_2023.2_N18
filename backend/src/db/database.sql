CREATE TABLE users (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(100),
  role VARCHAR(255) DEFAULT 'user',
  is_block INT default(0)
);

CREATE TABLE category(
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  image varchar(255) NOT NULL
);

CREATE TABLE product(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  categoryId integer NOT NULL,
  image varchar(255),
  label varchar(255),
  oldPrice int not null,
  newPrice int not null,
  keyword varchar(255),
  quantity int NOT NULL,
  sold int DEFAULT 0,
  description varchar(255),
  status varchar(20) default 'true'
);

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  customerName varchar(255) NOT NULL,
  phone varchar(10) NOT NULL,
  address varchar(255) NOT NULL,
  date varchar(255) DEFAULT CURRENT_TIMESTAMP,
  warranty varchar(255) NOT NULL,
  description varchar(1000) NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE orderedproduct (
  orderId INT NOT NULL,
  productId INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (orderId, productId),
  FOREIGN KEY (orderId) REFERENCES orders(id),
  FOREIGN KEY (productId) REFERENCES product(id)
);

CREATE TABLE cart (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  userId INT NOT NULL,
  productId INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (productId) REFERENCES product(id)
);

INSERT INTO users (username, password, role, is_block)
VALUES ('user1', '1', 'user', 0);

INSERT INTO users (username, password, role, is_block)
VALUES ('user2', '2', 'user', 0);

INSERT INTO users (username, password, email, avatar, role, is_block)
VALUES ('admin1', '1', 'admin1@gmail.com', 'avatar1.png', 'admin', 0);

INSERT INTO users (username, password, email, avatar, role, is_block)
VALUES ('admin2', '2', 'admin2@gmail.com', 'avatar2.png', 'admin', 0);

INSERT INTO users (username, password, email, avatar, role, is_block)
VALUES ('admin3', '$2a$10$VWJc1OnYdThT3CJzwk05GOumF5j3eRIvBsqfZDQ1IYM0./JPznKSm', 'admin3@gmail.com', 'avatar2.png', 'admin', 0);
-- $2a$10$VWJc1OnYdThT3CJzwk05GOumF5j3eRIvBsqfZDQ1IYM0./JPznKSm là băm của 3

INSERT INTO category(name) VALUES ('iPhone');
INSERT INTO category(name) VALUES ('Samsung');
INSERT INTO category(name) VALUES ('Oppo');
INSERT INTO category(name) VALUES ('Xiaomi');