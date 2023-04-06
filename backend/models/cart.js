// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Cart = sequelize.define('cart', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   }
// });

// module.exports = Cart;

const con = require("../util/database");
const table = "ecommerence.products";

exports.products = async function(){
  try{
      return new Promise((resolve,reject)=>{
          con.connect(function(err) {
              if (err) throw err;
              con.query(`SELECT * FROM ${table}`, function (err, result, fields) {
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