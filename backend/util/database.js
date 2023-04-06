// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete', 'root', 'Neeraj@9911', {
//   dialect: 'mysql',
//   host: 'localhost'
// });

// module.exports = sequelize;

const mysql = require ('mysql2');

const con = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:""
})

module.exports = con