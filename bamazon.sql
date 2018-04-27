DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
	item_id INTEGER(50) AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INTEGER(50) NOT NULL,
    stock_quantity INTEGER(50),
    PRIMARY KEY(item_id)
);

SELECT * FROM products;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Coffee Maker", "Kitchen Supplies", 20, 100),("Chair", "Decor", 35, 50),("Television","Electronics", 500, 5),
	  ("Drum Stick Pack", "Musical Instruments", 35, 40),("Frying Pan", "Kitchen Supplies", 15, 100),("Rug", "Decor", 40, 0),
      ("Computer Monitor", "Electronics", 225, 20),("2001: A Space Oddysey", "Books", 20, 10),("Game of Thrones: Season 1", "Movies", 80, 500),
      ("God of War", "Video Games", 60, 200);