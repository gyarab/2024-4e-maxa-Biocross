var db = require('../../database')


//funkce getCurses() nacte vsechny existujici kurzy pro konkretniho uzivatele
function getCourses(user_id){
  
    return new Promise((resolve, reject) => {
       var sql = "SELECT sc.course_id,course_teacherName, course_className, course_year, course_name FROM student_course sc JOIN student s ON(sc.student_id=s.student_id) JOIN course c ON(sc.course_id=c.course_id) WHERE s.student_id = ?;"
       db.query(sql,[user_id], function (err, result, fields) {
           if (err) {
             console.log(err);
             reject(err);
           }
           resolve(result);
          //  console.log(result);
        });
    });
}



module.exports = {getCourses}