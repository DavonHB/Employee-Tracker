INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Anakin', 'Skywalker', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Boba', 'Fett', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jaba', 'Hutt', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Nute', 'Gunray', 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bib', 'Fortuna', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Moff', 'Tarkin', 5, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Shiv', 'Palpatine', 6, null);

INSERT INTO department (department_name)
VALUES ('Management');
INSERT INTO department (department_name)
VALUES ('Sales');
INSERT INTO department (department_name)
VALUES ('Accounting');
INSERT INTO department (department_name)
VALUES ('Reception');
INSERT INTO department (department_name)
VALUES ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES ('General Manager', 150000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Salesman', 80000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 90000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ('Receptionist', 50000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ('Human Resource Officer', 80000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ('CEO', 300000, null);