CREATE DATABASE PizzaDB;
USE PizzaDB;
CREATE TABLE Customer (
    Customer_ID INT PRIMARY KEY,
    Customer_Name VARCHAR(50) NOT NULL,
    Phone VARCHAR(15) UNIQUE NOT NULL,
    Address VARCHAR(150) NOT NULL
);
CREATE TABLE Pizza (
    Pizza_ID INT PRIMARY KEY,
    Pizza_Name VARCHAR(50) NOT NULL,
    Size VARCHAR(20),
    Price DECIMAL(8,2) NOT NULL
);
CREATE TABLE Delivery_Agent (
    Agent_ID INT PRIMARY KEY,
    Agent_Name VARCHAR(50) NOT NULL,
    Phone VARCHAR(15),
    Status VARCHAR(20) DEFAULT 'Available'
);
CREATE TABLE Orders (
    Order_ID INT PRIMARY KEY,
    Customer_ID INT,
    Agent_ID INT,
    Order_Status VARCHAR(30) DEFAULT 'Placed',

    Order_Time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    Status_Update_Time DATETIME,

    Total_Amount DECIMAL(8,2),

    FOREIGN KEY (Customer_ID)
        REFERENCES Customer(Customer_ID),

    FOREIGN KEY (Agent_ID)
        REFERENCES Delivery_Agent(Agent_ID)
);
CREATE TABLE Order_Details (
    Order_ID INT,
    Pizza_ID INT,
    Quantity INT NOT NULL,
    Price DECIMAL(8,2) NOT NULL,

    PRIMARY KEY (Order_ID, Pizza_ID),

    FOREIGN KEY (Order_ID)
        REFERENCES Orders(Order_ID),

    FOREIGN KEY (Pizza_ID)
        REFERENCES Pizza(Pizza_ID)
);
INSERT INTO Pizza
VALUES
(1, 'Margherita', 'Regular', 199.00),
(2, 'Farmhouse', 'Medium', 299.00),
(3, 'Pepper BBQ', 'Large', 399.00),
(4, 'Cheese Burst', 'Medium', 349.00);
INSERT INTO Delivery_Agent
VALUES
(201, 'Karthik', '9000000001', 'Available'),
(202, 'Vijay', '9000000002', 'Available'),
(203, 'Sanjay', '9000000003', 'Available');
INSERT INTO Orders
(Order_ID, Customer_ID, Agent_ID, Order_Status, Total_Amount)
VALUES
(1001, 101, 201, 'Placed', 598.00);
INSERT INTO Order_Details
VALUES
(1001, 1, 1, 199.00),
(1001, 2, 1, 299.00);
UPDATE Orders
SET Order_Status = 'Confirmed'
WHERE Order_ID = 1001;
UPDATE Orders
SET Order_Status = 'Preparing'
WHERE Order_ID = 1001;
UPDATE Orders
SET Order_Status = 'Out for Delivery'
WHERE Order_ID = 1001;
UPDATE Orders
SET Order_Status = 'Delivered'
WHERE Order_ID = 1001;

SELECT
    O.Order_ID,
    C.Customer_Name,
    O.Order_Status,
    O.Order_Time,
    O.Status_Update_Time,
    A.Agent_Name,
    O.Total_Amount
FROM Orders O
JOIN Customer C
    ON O.Customer_ID = C.Customer_ID
LEFT JOIN Delivery_Agent A
    ON O.Agent_ID = A.Agent_ID
WHERE O.Order_ID = 1001;

SELECT
    O.Order_ID,
    C.Customer_Name,
    C.Phone,
    C.Address,
    A.Agent_Name,
    A.Phone AS Agent_Phone,
    O.Order_Time
FROM Orders O
JOIN Customer C
    ON O.Customer_ID = C.Customer_ID
JOIN Delivery_Agent A
    ON O.Agent_ID = A.Agent_ID
WHERE O.Order_Status = 'Out for Delivery';

SELECT *
FROM Orders
WHERE DATE(Order_Time) = CURDATE();
SELECT
    SUM(Total_Amount) AS Total_Sales
FROM Orders
WHERE Order_Status = 'Delivered';
