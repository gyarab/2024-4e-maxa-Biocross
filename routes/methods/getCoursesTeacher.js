var db = require('/Users/kryst/.vscode/Biocross/2024-4e-maxa-Biocross/database')


//funkce getCurses() nacte vsechny existujici kurzy pro konkretniho uzivatele
function getCoursesTeacher(user_id){
  
    return new Promise((resolve, reject) => {
        //potrebuji realne vsechno
       var sql = "SELECT * FROM course WHERE teacher_id = ?"
       db.query(sql,[user_id], function (err, result, fields) {
           if (err) {
             console.log(err);
             reject(err);
           }
           resolve(result);
        });
    });
}
function getKurzTask(user_id, course_id){
  
    return new Promise((resolve, reject) => {
        //potrebuji realne vsechno
       var sql = "SELECT c.course_id,course_teacherName, course_className, course_year, course_name,course_code, task_description, task_name,task_dateEntered,task_deadline,task_dateEntered FROM course c JOIN task t ON (t.course_id = c.course_id)WHERE t.teacher_id=? AND t.course_id = ?;"
       db.query(sql,[user_id,course_id], function (err, result, fields) {
           if (err) {
             console.log(err);
             reject(err);
           }
           resolve(result);
        });
    });
}

module.exports = {getCoursesTeacher,getKurzTask}