INSERT INTO department
    (name)
VALUES
    ('Executive'),
    ('Technology'),
    ('Marketing'),
    ('Operations');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('CEO', 100000, 1),
    ('CFO', 80000, 1),
    ('CTO', 150000, 2),
    ('Developer', 120000, 2),
    ('Salesman', 160000, 3),
    ('CMO', 125000, 3),
    ('CLO', 250000, 4),
    ('COO', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Eddie', 'Diaz', 1, NULL),
    ('Bobi', 'Ricaud', 2, 1),
    ('Rodrigo', 'Gomez', 3, NULL),
    ('Ricardo', 'Brauer', 4, 3),
    ('Fernando', 'Soto', 5, NULL),
    ('Mariana', 'Ramirez', 6, 5),
    ('Carla', 'Reyes', 7, NULL),
    ('Payton', 'Johnson', 8, 7);