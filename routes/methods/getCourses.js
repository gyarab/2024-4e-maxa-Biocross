var db = require('/Users/kryst/.vscode/Biocross/2024-4e-maxa-Biocross/database')


//funkce getCurses() nacte vsechny existujici kurzy pro konkretniho uzivatele
function getCourses(user_id){
  
    return new Promise((resolve, reject) => {
       var sql = "SELECT sc.course_id,course_teacherName, course_className, course_year, course_name FROM student_course sc JOIN student s ON(sc.student_id=s.student_id) JOIN course c ON(sc.course_id=c.course_id)WHERE s.student_id = ?;"
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

//nacte poslednich sest aktivit frienda, pouzivame v sekcich last Six
// function getFriendsLastSix(friendUserName){
  //  course_name, course_teacherName, course_className, course_year
//    console.log(friendUserName);
//     return new Promise((resolve, reject) => {
//        var sql = "SELECT user_username,activ_type, activ_name, activ_date, activ_timeFr, activ_timeTo, activ_distance, activ_cal from activity_log al JOIN users u ON(u.user_id = al.user_id) WHERE  user_username = ? ORDER BY activ_date DESC LIMIT 6;";
//        db.query(sql, [friendUserName], function (err, result, fields) {
//            if (err) {
//              console.log(err);
//              reject(err);
//            }
//            resolve(result);
//          });
//        });
// }


module.exports = {getCourses}