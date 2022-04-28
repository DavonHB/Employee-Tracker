//require dependencies 
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const util = require('util');
const { connect } = require('http2');

//create connection to workbench 
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_DB'
});

connection.query = util.promisify(connection.query);

//start app after connection
connection.connect(function (err) {
    if(err) throw err;
    initialAction();
})

//prompt to ask user what the would like to do
const initialAction = async () => {
    try {
        let answer = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View Employees',
                'View Departments',
                'View Roles',
                'Add Employees',
                'Add Departments',
                'Add Roles',
                'Update Employee Role',
                'Exit'
            ]
        });
        switch (answer.action) {
            case 'View Employees':
                employeeView();
                break;
            
            case 'View Departments':
                departmentView();
                break;
            
            case 'View Roles':
                roleView();
                break;
            
            case 'Add Employees':
                employeeAdd();
                break;

            case 'Add Departments':
                departmentAdd();
                break;
            
            case 'Add Roles':
                roleAdd();
                break;

            case 'Update Employee Role':
                employeeUpdate();
                break;
            
            case 'Exit':
                connection.end();
                break;
        };
    } catch (err) {
        console.log(err);s
        initialAction();
    };
}

//view all departments
const departmentView = async () => {
    console.log('Viewing Departments');
    try {
        let query = 'SELECT * FROM department';
        connect.query(query, function (err, res) {
            if (err) throw err;
            let departmentArray = [];
            res.forEach(department => department.Array.push(department));
            console.table(departmentArray);
            initialAction();
        });
    } catch (err) {
        console.log(err);
        initialAction();
    };
}

//view all roles
const roleView = async () => {
    console.log('Role View');
    try {
        let query = 'SELECT * FROM role';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let roleArray = [];
            res.forEach(role => roleArray.push(role));
            console.table(roleArray);
            initialAction();
        });
    } catch (err) {
        console.log(err);
        initialAction();
    };
}

//add new employee 
const employeeAdd = async () => {
    try {
        console.log('Employee Add');

        let roles = await connection.query("SELECT * FROM role");
        let managers = await connection.query("SELECT * FROM employee");

        let answer = await inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'What is the first name of this Employee?'
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is the last name of this Employee?'
            },
            {
                name: 'employeeRoleId',
                type: 'list',
                choices: roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                }),
                message: "What is the Employee's role id?"
            },
            {
                name: 'employeeManagerId',
                type: 'list',
                choices: managers.map((manager) => {
                    return {
                        name: manager.first_name + " " + manager.last_name,
                        value: manager.id
                    }
                }),
                message: "What is the Employee's Manager's id?" 
            }
        ]);

        let result = await connection.query("INSERT INTO employee set ?", {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: (answer.employeeRoleId),
            manager_id: (answer.employeeManagerId)
        });

        console.log(`${answer.firstName} ${answer.lastName} added.`);
        initialAction();

    } catch (err) {
        console.log(err);
        initialAction();
    };
}

//add new department 
const departmentAdd = async () => {
    try {
        console.log('Department Add');

        let answer = await inquirer.prompt([
            {
                name: 'deptName',
                type: 'input',
                message: 'What is the name of your new department?'
            }
        ]);

        let result = await connection.query("INSERT INTO department set ?", {
            department_name: answer.deptName
        });

        console.log(`${answer.deptName} added.`);
        initialAction();

    } catch (err) {
        console.log(err);
        initialAction();
    };
}

//add a new role
const roleAdd = async () => {
    try {
        console.log('Role Add');

        let departments = await connection.query("SELECT * FROM department");

        let answer = await inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the name of your new role?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this role?'
            },
            {
                name: 'departmentId',
                type: 'list',
                choices: departments.map((departmentsId) => {
                    return {
                        name: departmentsId.department_name,
                        value: departmentsId.id
                    }
                }),
                message: "What department ID is this role with?"
            }
        ]);

        let chosenDepartment;
        for (i = 0; i < departments.length; i++) {
            if(departments[i].department_id === answer.choice) {
                chosenDepartment = departments[i];
            };
        }
        let result = await connection.query("INSERT INTO employee set ?", {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.departmentId
        });

        console.log(`${answer.title} added.`);
        initialAction();

    } catch (err) {
        console.log(err);
        initialAction();
    };
}

//update roll for specific employee
const employeeUpdate = async () => {
    try {
        console.log('Employee Update');

        let employeeSelection = await inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                choices: employees.map((employeeName) => {
                    return {
                        name: employeeName.first_name + " " + employeeName.last_name,
                        value: employeeName.id
                    }
                }),
                message: "Choose an employee to update."
            },
        ]);

        let roles = await connection.query("SELECT * FROM role");

        let roleSelection = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: roles.map((roleName) => {
                    return {
                        name: roleName.title,
                        value: roleName.id
                    }
                }),
                message: 'Select the role to update the employee with.'
            }
        ]);

        let result = await connection.query("UPDATE employee SET ? where ?", [{ role_id: roleSelection.role }, { id: employeeSelection.employee }]);

        console.log(`The role was successfully added.`);
        initialAction();

    } catch (err) {
        console.log(err);
        initialAction();
    };
}