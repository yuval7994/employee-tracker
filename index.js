const inquirer = require("inquirer")
const mysql = require("mysql2")
const cTable = require("console.table")

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employees_db",
  },
  console.log("Connected to the Database")
)
const actions = [
  {
    type: "list",
    name: "action",
    message: "Which of the following do you wish to do?",
    choices: [
      "view all departments",
      "view all roles",
      "view all employees",
      "add a department",
      "add a role",
      "add an employee",
      "update an employee",
    ],
  },
]

inquirer.prompt(actions).then((answers) => {
  console.log(answers.action)
  if (answers.action === "view all departments") {
    db.query("SELECT * FROM department", (err, rows) => {
      console.table(rows)
    })
  }
  if (answers.action === "view all roles") {
    db.query("SELECT * FROM roles", (err, rows) => {
      console.table(rows)
    })
  }
  if (answers.action === "view all employees") {
    db.query("SELECT * FROM employee", (err, rows) => {
      console.table(rows)
    })
  }
  if (answers.action === "add a department") {
    const departmentQuestion = [
      {
        type: "input",
        name: "title",
        message: "Which department do you wish to add?",
      },
    ]

    inquirer.prompt(departmentQuestion).then((answers) => {
      const sql = `INSERT INTO department (name) VALUES('${answers.title}')`
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err)
        }
        console.log(result)
      })
    })
  }

  if (answers.action === "add a role") {
    const rolesQuestion = [
      {
        type: "input",
        name: "title",
        message: "What is the role you wish to add?",
      },

      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
      },

      {
        type: "input",
        name: "departmentId",
        message: "What is the department id of the role?",
      },
    ]

    inquirer.prompt(rolesQuestion).then((answers) => {
      const sql = `INSERT INTO roles (title, salary, department_id) VALUES('${answers.title}', '${answers.salary}', '${answers.departmentId}')`
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err)
        }
        console.log(result)
      })
    })
  }

  if (answers.action === "add an employee") {
    const employeeQuestion = [
      {
        type: "input",
        name: "firstName",
        message: "What is the first name of the employee you wish to add?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the last name of the enployee you wish to add?",
      },
      {
        type: "input",
        name: "roleId",
        message: "What is the role id of the employee?",
      },

      {
        type: "input",
        name: "managerId",
        message: "What is the manager id of the employee?",
      },
    ]

    inquirer.prompt(employeeQuestion).then((answers) => {
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('${answers.firstName}', '${answers.lastName}', '${answers.roleId}', '${answers.managerId}')`
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err)
        }
        console.log(result)
      })
    })
  }

  if (answers.action === "update an employee") {
    const sql = `SELECT * FROM employee ;`
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
      }
      const employeeNames = result.map(
        (employee) => `${employee.first_name} ${employee.last_name}`
      )
      const updateEmployeeQuestion = [
        {
          type: "list",
          name: "employee",
          message: "Which is the employee you wish to update?",
          choices: employeeNames,
        },
      ]
      inquirer.prompt(updateEmployeeQuestion).then((answers) => {
        const sql = `SELECT * FROM roles ;`
        db.query(sql, (err, result) => {
          if (err) {
            console.log(err)
          }
          const roleTitle = result.map((role) => role.title)
          const updateRoleQuestion = [
            {
              type: "list",
              name: "roles",
              message: "Which role do you wish to update to?",
              choices: roleTitle,
            },
          ]
          inquirer.prompt(updateRoleQuestion).then((answers)

          )
         })
      })
    })
  }
})
