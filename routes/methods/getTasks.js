var db = require('../../database')


//funkce getTasks() nacte vsechny existujici kurzy pro konkretniho uzivatele
function getTasks(user_id){
  
    return new Promise((resolve, reject) => {
       var sql = "SELECT task_name, task_description, task_dateEntered, task_deadline, course_name, course_teacherName FROM task t JOIN course c ON(t.course_id=c.course_id) JOIN student_course st ON(st.course_id=c.course_id) WHERE st.student_id =?;"
       db.query(sql,[user_id], function (err, result, fields) {
           if (err) {
             console.log(err);
             reject(err);
           }
           resolve(result);
        });
    });
}

function getTasksKurz(course_id){
  
  return new Promise((resolve, reject) => {
     var sql = "SELECT task_name, task_description, task_dateEntered, task_deadline, c.course_id, course_name, course_teacherName, course_className, course_code FROM task t JOIN course c ON(t.course_id=c.course_id) JOIN student_course st ON(st.course_id=c.course_id) WHERE st.course_id =?;"
     db.query(sql,[course_id], function (err, result, fields) {
         if (err) {
           console.log(err);
           reject(err);
         }
         resolve(result);
      });
  });
}

module.exports = {getTasks,getTasksKurz}