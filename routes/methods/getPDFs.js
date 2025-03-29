const express = require('express');
const db = require('../../database');

const router = express.Router();

function getPDFs(user_id){
  
    return new Promise((resolve, reject) => {
        //potrebuji realne vsechno
       var sql = "SELECT donetasks_pdf FROM donetasks WHERE task_id = ?"
       db.query(sql,[user_id], function (err, result, fields) {
           if (err) {
             console.log(err);
             reject(err);
           }
           console.log(result);
           
           resolve(result);
        });
    });
}

getPDFs(2)

module.exports = {getPDFs}