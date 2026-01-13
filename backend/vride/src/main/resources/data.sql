-- Sample users for VRide application
-- Password is 'password123' for all users (bcrypt hashed)
-- All users have the same bcrypt hash: $2a$10$XPTr1EQKhJx5vZKhFQKZX.YPMhGvFJ8z9JJZKqL8vZGZKhFQKZX.Y

INSERT INTO "user" (employee_id, first_name, last_name, email, password, status) VALUES 
(101, 'Sarah', 'Johnson', 'sarah.j@company.com', '$2a$10$XPTr1EQKhJx5vZKhFQKZX.YPMhGvFJ8z9JJZKqL8vZGZKhFQKZX.Y', 'VERIFIED'),
(102, 'Michael', 'Chen', 'michael.c@company.com', '$2a$10$XPTr1EQKhJx5vZKhFQKZX.YPMhGvFJ8z9JJZKqL8vZGZKhFQKZX.Y', 'VERIFIED'),
(103, 'Emily', 'Rodriguez', 'emily.r@company.com', '$2a$10$XPTr1EQKhJx5vZKhFQKZX.YPMhGvFJ8z9JJZKqL8vZGZKhFQKZX.Y', 'VERIFIED'),
(104, 'David', 'Kim', 'david.k@company.com', '$2a$10$XPTr1EQKhJx5vZKhFQKZX.YPMhGvFJ8z9JJZKqL8vZGZKhFQKZX.Y', 'VERIFIED'),
(105, 'Jessica', 'Patel', 'jessica.p@company.com', '$2a$10$XPTr1EQKhJx5vZKhFQKZX.YPMhGvFJ8z9JJZKqL8vZGZKhFQKZX.Y', 'VERIFIED'),
(106, 'James', 'Anderson', 'james.a@company.com', '$2a$10$XPTr1EQKhJx5vZKhFQKZX.YPMhGvFJ8z9JJZKqL8vZGZKhFQKZX.Y', 'VERIFIED');

-- Sample carpools
INSERT INTO carpools (ownerid, ownername, fromlocation, vehicle, regno, noofseats, date, time) VALUES
(101, 'Sarah', 'Downtown Seattle', 'Tesla Model 3', 'WA-2023-XY', 3, '2026-01-15', '08:00'),
(102, 'Michael', 'Bellevue Station', 'Honda Accord', 'WA-2022-AB', 2, '2026-01-15', '08:30'),
(103, 'Emily', 'Capitol Hill', 'Toyota Prius', 'WA-2021-CD', 3, '2026-01-16', '09:00'),
(104, 'David', 'University District', 'Hyundai Elantra', 'WA-2023-EF', 2, '2026-01-16', '08:15'),
(105, 'Jessica', 'Green Lake', 'Nissan Altima', 'WA-2022-GH', 4, '2026-01-17', '07:45'),
(106, 'James', 'Fremont', 'Mazda CX-5', 'WA-2021-IJ', 3, '2026-01-17', '08:30');
