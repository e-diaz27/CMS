const connection = require('./db/connection');
const inquirer = require('inquirer');
require("console.table");

const start = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "answer",
            message: "what do you want to do?",
            choices: [
                "viewAllEmployees",
                "viewAllRoles",
                "viewAllDepartments",
                "addEmployee",
                "addRole",
                "addDepartment",
                "updateEmployeeRole"
            ]
        }
    ]).then((answer) => {
        switch (answer.answer) {
            case "viewAllEmployees":
                viewAllEmployees();
                break;
            case "viewAllRoles":
                viewAllRoles();
                break;
            case "viewAllDepartments":
                viewAllDepartments();
                break;
            case "addEmployee":
                addEmployee();
                break;
            case "addRole":
                addRole();
                break;
            case "addDepartment":
                addDepartment();
                break;
            case "updateEmployeeRole":
                updateEmployeeRole();
                break;
            default:
                break;
        }
    })
}

const viewAllEmployees = () => {
    connection.query(`
    SELECT 
        employee.id,
        employee.first_name,
        employee.last_name, 
        role.title, 
        department.name AS department,
        role.salary,
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employee 
        LEFT JOIN role on employee.role_id = role.id 
        LEFT JOIN department on role.department_id = department.id 
        LEFT JOIN employee manager on manager.id = employee.manager_id`, (err, data) => {
        console.log("\n");
        console.table(data);
        start();
    })
}

const viewAllRoles = () => {
    connection.query(`
    SELECT
        role.id,
        role.title,
        role.salary,
        department.name AS department
    FROM role
        LEFT JOIN department on role.department_id = department.id 
    `, (err, data) => {
        console.log(err);
        console.table(data);
        start()
    })
}

const viewAllDepartments = () => {
    connection.query("SELECT * from department", (err, data) => {
        console.log("\n");
        console.table(data);
        start()
    })
}

const addEmployee = () => {

    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "what is employee first name?",
        },
        {
            type: "input",
            name: "last_name",
            message: "what is employee last name?",
        },
        {
            type: "input",
            name: "role_id",
            message: "what role id?",
        }, {
            type: "input",
            name: "manager_id",
            message: "what manager id?",
        },
    ]).then((answers) => {
        connection.query("INSERT INTO employee SET ?", [answers], (err, data) => {
            console.log("employee added successfully");
            start()
        })
    })
}
    
const addRole = () => {
    
        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "what is role title?",
            },
            {
                type: "input",
                name: "salary",
                message: "what is role salary?",
            },
            {
                type: "input",
                name: "department_id",
                message: "what is department id?",
            },
        ]).then((answers) => {
            connection.query("INSERT INTO role SET ?", [answers], (err, data) => {
                console.log("role added successfully");
                start()
            })
        })
}

const addDepartment = () => {
    
        inquirer.prompt([
            {
                type: "input",
                name: "department_name",
                message: "what is department name?",
            },
        ]).then((answers) => {
            connection.query("INSERT INTO department SET ?", [answers], (err, data) => {
                console.log("department added successfully");
                start()
            })
        })
}

const updateEmployeeRole = () => {
    connection.query(`SELECT * FROM employee`, (err, employees) => {
        inquirer.prompt([
            {
                type: "list",
                name: "employee_id",
                message: "select employee to update",
                choices: employees.map(employee => ({name:`${employee.first_name} ${employee.last_name}`, value: employee.id}))
            },
            {
                type: "input",
                name: "role_id",
                message: "select new role_id",
            },
        ]).then((answers) => {
            connection.query("UPDATE employee SET employee.role_id = ? WHERE employee.id = ?", 
            [answers.role_id, answers.employee_id], (err, data) => {
                if (err) {console.log("error, please reference database for valid ids.")
                } else {console.log("employee updated successfully")}
                start()
            })
        })

    })
}

start();