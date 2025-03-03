const express = require('express');
const router = express.Router();
const {requireRole} = require("../middleware/auth");
const db = require('../database');

const getCurses = require('./methods/getCurses')

//Ukoly
router.get("/ukoly",requireRole("student"), async(req,res)=>{
    
     var arrCurses = await getCurses.getCurses()
    
      try {
        res.format({
          html: async () => {
            res.render("classroomUkoly");
          },
          json: () => {   
            res.json(arrCurses);
          }
        }); 
      } catch (err){
        console.error(err);
        res.status(500).send('Server Error');
      }
});

//zapsat se jako student do kurzu
router.post("/", (req,res)=>{
    var course_code = req.body.input_course;
    let student_id = req.session.user_id; // 💡 Tady bereme student_id ze session

    var kontrolaZapisuSQL = "SELECT * FROM student_course WHERE student_id = ? AND course_id = (SELECT course_id FROM course WHERE course_code = ?)"; // sql dotaz pro kontrolu jestli se student uz nezapsal
    var insertCourseSQL = `INSERT INTO student_course (student_id, course_id)SELECT ?, course_id FROM course WHERE course_code = ?;`;

    db.query(kontrolaZapisuSQL, [student_id, course_code], function(err, results) {
        if (err) throw err
        
        if (results.length > 0) {
            // Student už je zapsany v kurzu
            req.session.message = { success: false, text: "Již jste zapsán v tomto kurzu!" };
            res.redirect("/classroom");
        } else {
            // Pokud neni, muzeme vlozit novy zaznam
            db.query(insertCourseSQL, [student_id, course_code], function(err, results) {
                if (err) {
                    console.error("Chyba při zápisu do kurzu:", err);
                    req.session.message = { success: false, text: "Chyba při zápisu do kurzu." };
                }
                if (results.affectedRows === 0) {
                    req.session.message = { text: "Kurz s tímto kódem neexistuje.", success: false };
                }else {
                    req.session.message = { success: true, text: "Kurz byl úspěšně přidán!" };
                }
                res.redirect("/classroom");
            });
        }
    });
});

//Kurzy
module.exports = router;