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
  name varchar(255) NOT NULL
);

CREATE TABLE brand(
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  categoryId int NOT NULL,
  image varchar(255)
);

CREATE TABLE product(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  categoryId integer NOT NULL,
  brandId integer NOT NULL,
  image varchar(255),
  label varchar(255),
  oldPrice int not null,
  newPrice int not null,
  keyword varchar(255),
  quantity int NOT NULL,
  sold int DEFAULT 0,
  description varchar(255),
  status varchar(20) default 'true',
  FOREIGN KEY (categoryId) REFERENCES category(id),
  FOREIGN KEY (brandId) REFERENCES brand(id)
);

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  email VARCHAR(100) NOT NULL,
  customerName varchar(255) NOT NULL,
  phone varchar(10) NOT NULL,
  address varchar(255) NOT NULL,
  date varchar(255) DEFAULT CURRENT_TIMESTAMP,
  warranty varchar(255) NOT NULL,
  paymentModal varchar(255) NOT NULL,
  paymentStatus varchar(255) NOT NULL,
  description varchar(1000),
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE orderedproduct (
  orderId INT NOT NULL,
  productId INT NOT NULL,
  price INT NOT NULL,
  quantity INT NOT NULL,
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

INSERT INTO category(name) VALUES ('Điện thoại');
INSERT INTO category(name) VALUES ('Laptop');

INSERT INTO brand (name, categoryId, image) VALUES ("Apple", 1, "http://localhost:4000/images/8d14c090-5547-4274-a346-bafd26e02c9d.webp");
INSERT INTO brand (name, categoryId, image) VALUES ("Samsung", 1, "http://localhost:4000/images/0a3ece96-75de-411b-942f-ceba2ff3f351.webp");
INSERT INTO brand (name, categoryId, image) VALUES ("Xiaomi", 1, "http://localhost:4000/images/ba728fdd-a813-4371-885a-a95f7742ba3f.webp");
INSERT INTO brand (name, categoryId, image) VALUES ("OPPO", 1, "http://localhost:4000/images/c0ef3f2b-0a3b-4674-849e-1a0ad48afa09.webp");