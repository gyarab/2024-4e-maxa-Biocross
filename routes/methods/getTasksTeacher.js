var db = require('/Users/kryst/.vscode/Biocross/2024-4e-maxa-Biocross/database')


//funkce getCurses() nacte vsechny existujici kurzy pro konkretniho uzivatele
function getTasksTeacher(user_id){
  
    return new Promise((resolve, reject) => {
        //potrebuji realne vsechno
       var sql = "SELECT * FROM task WHERE teacher_id = ?"
       db.query(sql,[user_id], function (err, result, fields) {
           if (err) {
             console.log(err);
             reject(err);
           }
           resolve(result);
        });
    });
}


module.exports = {getTasksTeacher}