// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });

// module.exports = User;

// const Sequelize = require("sequelize");
// const  sequelize  = require("../util/database");

// const ExpenseTracker = sequelize.define('Expense-Tracker',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     },
//     email:{
//         type:Sequelize.STRING,
//         allowNull:false,

//     },
//     password:Sequelize.STRING
// })

const con = require("../util/database");
const table = "ecommerence.user";

exports.details = function(email,password){
  try{
      return new Promise((resolve,reject)=>{
          con.connect(function(err) {
              if (err) throw err;
              con.query(` INSERT INTO ${table} (email , password) VALUES('${email}','${password}')`, function (err, result, fields) {
                if (err) throw err;
                resolve(result)
                console.log(result);
              });
            });
       })
  }
  catch(err){
    console.log("bye");
      console.log(err)
      return new Promise ((resolve,reject)=>{
          reject(err)
      })  
  }
}

exports.entry = function(email){
  try{
      return new Promise((resolve,reject)=>{
          con.connect(function(err) {
              if (err) throw err;
              con.query(`SELECT email,password from ${table} where email='${email}'`, function (err, result, fields) {
                if (err) throw err;
                resolve(result)
                console.log(result);
              });
            });
       })
  }
  catch(err){
    console.log("bye");
      console.log(err)
      return new Promise ((resolve,reject)=>{
          reject(err)
      })  
  }
}
