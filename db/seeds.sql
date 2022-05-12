USE employees_db;

INSERT INTO department (name)
VALUES 
('Marketing'),
('Accounting'),
('Legal'),
('Human Resources'),
('Support'),
('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES
('Actor', 700, 0),
('Accountant', 800, 1),
('Lawyer', 900, 2),
('Manager', 500, 3),
('Engineer', 600, 4),
('Sales Rep', 400, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Pamela', 'Michele', 0, 2),
('Dylan', 'Thomas', 1, 2),
('Conor', 'Phillips', 2, 2),
('Nicole', 'Kristen', 3, 2),
('Maisie', 'Mae', 4, 2),
('Neil', 'Benjamin', 5, 2);