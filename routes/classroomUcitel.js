const express = require('express');
const router = express.Router();
const db = require('../database.js');
const {requireRole} = require("../middleware/auth");

const getCursesTeacher = require('./methods/getCoursesTeacher.js')

//Ukoly
router.get("/novyKurz",requireRole("teacher"), async(req,res)=>{
    let message = req.session.message;
    req.session.message = null;

    var user_id = req.session.user_id;

    // nejdriv si nactu vsechny kurzy ktere mam k tomuto uciteli
    var arrCurses = await getCursesTeacher.getCursesTeacher(user_id);
    try {
        res.format({
          html: async () => {
            res.render('classroomUcitelKurz', {message}); //new kurz          
        },json: () => {   
            res.json(arrCurses);
          }
        }); 
      } catch (err){
        console.error(err);
        res.status(500).send('Server Error');
      }
    
});


//UKOLY

//Nacteni stranky ukoly
router.get("/ukoly",requireRole("teacher"), async(req,res)=>{
    let message = req.session.message;
    req.session.message = null;

    var user_id = req.session.user_id;

    // nejdriv si nactu vsechny kurzy ktere mam k tomuto uciteli
    var arrCurses = await getCursesTeacher.getCursesTeacher(user_id);

    console.log(arrCurses);
    
    try {
        res.format({
          html: async () => {
            res.render('classroomUcitelUkoly', {message});
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

//id ucitele - jeste nefunguje
var course_id = 1;

//Pridani noveho ukolu
//do DB se prida novy ukol
router.post("/ukoly", (req,res)=>{
    console.log("Provedl se ukoly post");
    
    //ID ucitele
    var teacher_id = req.session.user_id;
    //nacteni info 
    var task_name = req.body.jmenoUkolu;
    var task_description = req.body.popisUkolu;
    var task_dateEntered = req.body.datumOdevzdaniUkolu;
    var task_deadline = req.body.datumOdevzdaniUkolu;

 
    //INSERT noveho ukolu do databaze
    var insertTaskSQL = 'INSERT INTO task (teacher_id,course_id,task_name,task_description,task_dateEntered,task_deadline) VALUES (?,?,?,?,?,?)';

    db.query(insertTaskSQL,[teacher_id,course_id,task_name,task_description, task_dateEntered, task_deadline], function (err, results) {
        if (err){
            console.log(err);
            req.session.message = { success: true, text:"Něco se pokazilo!"}
            res.redirect("/classroomUcitel/ukoly")
        }else {
            req.session.message = { success: true, text:"Úkol byl úspěšně vytvořen!"}
            console.log("Ukol pridan");
            res.redirect("/classroomUcitel/ukoly")
        }
    });
});

//ulozi noby kurz do databaze
router.post("/novyKurz", async (req,res)=>{
    console.log("Post probehl");
    var teacher_id = req.session.user_id;

    var course_name = req.body.courseName;
    var course_teacherName = req.body.teachersName;
    var course_className = req.body.className;
    var course_year = req.body.courseYear;

    //prepsat to bez sql injection = hotove
     var insertNovehoKurzuSQL = "INSERT INTO course(teacher_id, course_name,course_teacherName,course_className,course_year,course_code) VALUES (?,?,?,?,?,?)";

    var course_code = await createCode(); //kod pro kurz
    console.log("kod je"+course_code);
    
    db.query(insertNovehoKurzuSQL,[teacher_id, course_name,course_teacherName,course_className,course_year,course_code], function(err,result){
        if(err){
            console.log(err);
            res.redirect("/classroomUcitel/novyKurz");

        }else{
            console.log("Course add correctly");
            res.redirect("/classroomUcitel/novyKurz");
        }
    });
});

//kazdy kurz ma svuj random kod, musi byt unikatni 
//pdoivat se do DB jestli jiz existuje?
//REKURZIVNI VOLANI fce, hleda kod dokud neexsituje, rychly pro male mnozstvi kurzu
function createCode() { 
    return new Promise((resolve, reject) => {
        var existujeCodeSQL = "SELECT course_code FROM course WHERE course_code = ?";
        var code = Math.floor(100000000 + Math.random() * 900000000);

        db.query(existujeCodeSQL, [code], function (err, result) {
            if (err) return reject(err);

            if (result.length < 1) {
                resolve(code); // Vrátíme vygenerovaný kód
            } else {
                console.log("Rekurze hledání kódu");
                resolve(createCode()); // Opakujeme hledání
            }
        });
    });
}
//Kurzy
module.exports = router;