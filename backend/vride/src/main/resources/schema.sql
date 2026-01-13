-- User table
CREATE TABLE IF NOT EXISTS "user" (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255),
    status VARCHAR(50)
);

-- Carpools table
CREATE TABLE IF NOT EXISTS carpools (
    carpoolId INT AUTO_INCREMENT PRIMARY KEY,
    ownerId INT,
    ownerName VARCHAR(100),
    fromLocation VARCHAR(255),
    toLocation VARCHAR(255),
    vehicle VARCHAR(100),
    regno VARCHAR(50),
    noOfSeats INT,
    date VARCHAR(50),
    time VARCHAR(50)
);

-- SignedIn table
CREATE TABLE IF NOT EXISTS signed_in (
    empid INT,
    firstname VARCHAR(100)
);
