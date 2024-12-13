var db = require('/home/krystof/Documents/vscode/Biocross/2024-4e-maxa-Biocross/database.js')


//funkce getCurses() nacte vsechny existujici kurzy pro konkretniho uzivatele
function getCurses(){
  
    return new Promise((resolve, reject) => {
       var sql = "SELECT course_name, course_teacherName, course_className, course_year FROM course;"
       db.query(sql, function (err, result, fields) {
           if (err) {
             console.log(err);
             reject(err);
           }
           resolve(result);
           console.log(result);
         });
       });
}

//nacte poslednich sest aktivit frienda, pouzivame v sekcich last Six
function getFriendsLastSix(friendUserName){
   
   console.log(friendUserName);
    return new Promise((resolve, reject) => {
       var sql = "SELECT user_username,activ_type, activ_name, activ_date, activ_timeFr, activ_timeTo, activ_distance, activ_cal from activity_log al JOIN users u ON(u.user_id = al.user_id) WHERE  user_username = ? ORDER BY activ_date DESC LIMIT 6;";
       db.query(sql, [friendUserName], function (err, result, fields) {
           if (err) {
             console.log(err);
             reject(err);
           }
           resolve(result);
         });
       });
}


module.exports = {getCurses,getFriendsLastSix}