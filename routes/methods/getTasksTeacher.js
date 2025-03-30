var db = require('../../database')


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

//vrati odpovedi ke konkretnim ukolum
function getDoneTasks(course_id) {
    return new Promise((resolve, reject) => {
       var sql = "SELECT  task_id, s.student_firstname, s.student_lastname, donetasks_pdf FROM donetasks dt JOIN student s ON (dt.student_id=s.student_id) WHERE course_id = ?";
       db.query(sql,[course_id], function (err, result, fields) {
           if (err) {
             console.log(err);
             reject(err);
           }
           resolve(result);
        });
    });
}

module.exports = {getTasksTeacher,getDoneTasks}