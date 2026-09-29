Pizza Delivery System
Project Overview

The Pizza Delivery System is a Java GUI-based application developed to manage pizza orders, customer information, pizza details, delivery agents, order status, and delivery tracking.

The application uses Java Swing for the graphical user interface and MySQL for database management. JDBC is used to connect the Java application with the MySQL database.

The system is designed to provide a simple and efficient way to place and manage pizza delivery orders.

Objectives
To develop a user-friendly pizza ordering application.
To maintain customer information.
To manage pizza details and prices.
To manage delivery agents.
To create and manage customer orders.
To track order status.
To record order and status update timestamps.
To connect a Java GUI application with MySQL.
To implement database relationships using primary and foreign keys.
To avoid automatic order ID generation by using manually entered Order IDs.
Features
Customer Management

The system stores:

Customer ID
Customer Name
Phone Number
Delivery Address
Pizza Management

The system provides different pizza options such as:

Margherita
Farmhouse
Pepper BBQ
Cheese Burst

Each pizza has a corresponding price.

Order Management

The application allows users to:

Enter Order ID manually.
Select a customer.
Select a pizza.
Enter quantity.
Select a delivery agent.
Calculate the total amount.
Place an order.
Update order status.
Delivery Status Tracking

The order can have different statuses:

Placed
   ↓
Confirmed
   ↓
Preparing
   ↓
Out for Delivery
   ↓
Delivered

An order can also be marked as:

Cancelled
Timestamp Management

The system records:

Order creation time.
Latest order status update time.

MySQL TIMESTAMP and CURRENT_TIMESTAMP are used for time management.

Technologies Used
Technology	Purpose
Java	Application development
Java Swing	GUI development
JDBC	Java-MySQL connectivity
MySQL	Database management
SQL	Database operations
Git	Version control
GitHub	Project hosting
Software Requirements
JDK 8 or later
MySQL Server
MySQL Workbench
JDBC MySQL Connector
IntelliJ IDEA / Eclipse / NetBeans / VS Code
Git
GitHub Account
Hardware Requirements
Processor: Intel Core i3 or above
RAM: 4 GB or above
Storage: At least 500 MB free space
Operating System: Windows / Linux / macOS
Database Design

The project contains the following main tables:

Customer
    |
    | Customer_ID
    |
   Orders
   /     \
  /       \
Pizza    Delivery_Agent
  |
Order_Details
Database Tables
Customer
Column	Data Type	Description
Customer_ID	INT	Primary key
Customer_Name	VARCHAR(50)	Customer name
Phone	VARCHAR(15)	Customer phone
Address	VARCHAR(150)	Delivery address
Pizza
Column	Data Type	Description
Pizza_ID	INT	Primary key
Pizza_Name	VARCHAR(50)	Pizza name
Size	VARCHAR(20)	Pizza size
Price	DECIMAL	Pizza price
Delivery_Agent
Column	Data Type	Description
Agent_ID	INT	Primary key
Agent_Name	VARCHAR(50)	Delivery agent name
Phone	VARCHAR(15)	Agent phone
Status	VARCHAR(20)	Agent availability
Orders
Column	Data Type	Description
Order_ID	INT	Primary key
Customer_ID	INT	Foreign key
Agent_ID	INT	Foreign key
Order_Status	VARCHAR(30)	Current order status
Order_Time	TIMESTAMP	Order creation time
Status_Update_Time	DATETIME	Latest status update
Total_Amount	DECIMAL	Total order amount
Order_Details
Column	Data Type	Description
Order_ID	INT	Foreign key
Pizza_ID	INT	Foreign key
Quantity	INT	Number of pizzas
Price	DECIMAL	Pizza price
Important Database Feature

The project does not use AUTO_INCREMENT.

The Order ID is manually entered by the user.

Example:

INSERT INTO Orders
(Order_ID, Customer_ID, Agent_ID, Order_Status, Total_Amount)
VALUES
(1001, 101, 201, 'Placed', 598.00);

This allows the project to demonstrate manual primary key management.

Timestamp Management

The order creation time is automatically generated using:

Order_Time TIMESTAMP DEFAULT CURRENT_TIMESTAMP

The status update time is maintained using a trigger:

DELIMITER //

CREATE TRIGGER update_order_time
BEFORE UPDATE ON Orders
FOR EACH ROW
BEGIN
    SET NEW.Status_Update_Time = CURRENT_TIMESTAMP;
END //

DELIMITER ;

Whenever the order status changes, the latest update time is recorded.

Example:

UPDATE Orders
SET Order_Status = 'Out for Delivery'
WHERE Order_ID = 1001;

The Status_Update_Time is automatically updated.

Sample Pizza Data
INSERT INTO Pizza
VALUES
(1, 'Margherita', 'Regular', 199.00),
(2, 'Farmhouse', 'Medium', 299.00),
(3, 'Pepper BBQ', 'Large', 399.00),
(4, 'Cheese Burst', 'Medium', 349.00);
Sample Customer Data
INSERT INTO Customer
VALUES
(101, 'Rahul', '9876543210', 'Chennai'),
(102, 'Priya', '9876543211', 'Tambaram'),
(103, 'Arun', '9876543212', 'Velachery');
Sample Delivery Agent Data
INSERT INTO Delivery_Agent
VALUES
(201, 'Karthik', '9000000001', 'Available'),
(202, 'Vijay', '9000000002', 'Available'),
(203, 'Sanjay', '9000000003', 'Available');
Java GUI

The Java Swing interface provides fields for:

Order ID
Customer ID
Customer Name
Phone
Address
Pizza
Quantity
Delivery Agent
Order Status
Order Time
Status Update Time
Total Amount

The application provides buttons for:

PLACE ORDER
UPDATE STATUS
JDBC Connectivity

The Java application communicates with MySQL using JDBC.

Basic connection structure:

Connection con = DriverManager.getConnection(
    "jdbc:mysql://localhost:3306/PizzaDelivery",
    "root",
    "your_password"
);

Prepared statements can be used to safely insert and update records.

Project Structure
Pizza-Delivery-System/
│
├── src/
│   ├── PizzaDeliveryGUI.java
│   ├── DatabaseConnection.java
│   ├── Customer.java
│   ├── Pizza.java
│   ├── Order.java
│   └── DeliveryAgent.java
│
├── database/
│   └── PizzaDelivery.sql
│
├── screenshots/
│   ├── login.png
│   ├── order.png
│   └── database.png
│
└── README.md
Installation and Setup
Step 1: Install MySQL

Install MySQL Server and MySQL Workbench.

Step 2: Create the Database

Open MySQL Workbench and execute:

CREATE DATABASE PizzaDelivery;

USE PizzaDelivery;
Step 3: Create the Tables

Execute the SQL commands for:

Customer
Pizza
Delivery_Agent
Orders
Order_Details
Step 4: Insert Sample Data

Insert the sample customer, pizza, and delivery-agent records.

Step 5: Configure JDBC

Add the MySQL Connector/J library to the Java project.

Step 6: Update Database Credentials

Modify the database connection:

String url =
    "jdbc:mysql://localhost:3306/PizzaDelivery";

String username = "root";
String password = "your_password";

Replace your_password with your MySQL password.

Step 7: Run the Application

Compile and run:

PizzaDeliveryGUI.java

The Pizza Delivery System GUI will open.

Example Order

An example order can be created as:

Order ID       : 1001
Customer ID    : 101
Customer Name  : Rahul
Pizza          : Margherita
Quantity       : 1
Agent          : Karthik
Status         : Placed
Total Amount   : ₹199

The order status can then be changed:

Placed
Confirmed
Preparing
Out for Delivery
Delivered
SQL Operations

The system supports:

INSERT
SELECT
UPDATE
DELETE
JOIN
Aggregate functions
Primary keys
Foreign keys
Constraints
Triggers
Timestamp handling
Advantages
Simple graphical interface.
Easy pizza ordering.
Centralized database.
Manual Order ID management.
Automatic timestamp recording.
Order status tracking.
Delivery agent management.
Relational database structure.
Java and MySQL integration.
Future Enhancements

The following features can be added in future versions:

Customer login and registration.
Admin login.
Online payment.
Order cancellation.
Pizza customization.
Discount and coupon system.
Customer ratings and reviews.
Delivery location tracking.
Estimated delivery time.
Order history.
Email or SMS notifications.
Multiple restaurant branches.
Real-time delivery tracking.
Learning Outcomes

Through this project, the following concepts are demonstrated:

Java GUI development using Swing.
Object-Oriented Programming.
JDBC connectivity.
MySQL database management.
SQL queries.
Primary and foreign keys.
Database normalization concepts.
Triggers.
Timestamp handling.
CRUD operations.
Git and GitHub project management.
Conclusion

The Pizza Delivery System demonstrates how a Java GUI application can be integrated with a MySQL relational database to manage pizza orders and delivery information.
