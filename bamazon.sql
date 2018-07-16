DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT ,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(40) NOT NULL,
price DECIMAL(8,2) NOT NULL,
stock_quantity INT(30),
PRIMARY KEY(item_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity)
values ('guitar','music',180, 65),('mop','cleaning',4.50,300),('computer','technology',900,120),
('iphone','phones',1000,150),('shirt','clothing',12, 500),('book','education',22, 200),
('toaster','kitchen',30,500),('perfume','beauty',50,100),('movie','entertainment',15,400),
('desk','home',100,200);

SELECT * FROM products;