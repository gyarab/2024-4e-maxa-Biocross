const express = require('express');
const router = express.Router();
const db = require('../database.js');
const {requireRole} = require("../middleware/auth");

const getCoursesTeacher = require('./methods/getCoursesTeacher.js')
const getTasksTeacher = require('./methods/getTasksTeacher.js')


//Ukoly
router.get("/novyKurz",requireRole("teacher"), async(req,res)=>{
    let message = req.session.message;
    req.session.message = null;

    var user_id = req.session.user_id;

    // nejdriv si nactu vsechny kurzy ktere mam k tomuto uciteli
    var arrCourses = await getCoursesTeacher.getCoursesTeacher(user_id);

    try {
        res.format({
          html: async () => {
            res.render('classroomUcitelKurz', {message}); //new kurz          
        },json: () => {   
            res.json(arrCourses);
          }
        }); 
      } catch (err){
        console.error(err);
        res.status(500).send('Server Error');
      }
    
});

router.get("/kurz",requireRole("teacher"), async(req,res)=>{
  var user_id = req.session.user_id;
  var course_id = req.query.id;


  // nejdriv si nactu vsechny kurzy ktere mam k tomuto uciteli
  var arrCourses = await getCoursesTeacher.getCoursesTeacher(user_id);
  var arrKurzTask = await getCoursesTeacher.getKurzTask( user_id, course_id);
  console.log(course_id);
  
  var arrDoneTasks = await getTasksTeacher.getDoneTasks(course_id);
  console.log(arrDoneTasks);

  try {
      res.format({
        html: async () => {
          res.render('classroomUcitelKurzLegit'); //new kurz          
      },json: () => {   
          res.json({courses:arrCourses, tasks: arrKurzTask, doneTasks:arrDoneTasks});
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
    var arrCourses = await getCoursesTeacher.getCoursesTeacher(user_id);
    var arrTasks = await getTasksTeacher.getTasksTeacher(user_id);

    // console.log(arrCourses, arrTasks);
    
    try {
        res.format({
          html: async () => {
            res.render('classroomUcitelUkoly', {message});
          },
          json: () => {   
            res.json({courses:arrCourses, tasks:arrTasks});
          }
        }); 
      } catch (err){
        console.error(err);
        res.status(500).send('Server Error');
      }
});


//Pridani noveho ukolu
//do DB se prida novy ukol
router.post("/ukoly", (req,res)=>{
    console.log("Provedl se ukoly post");
    
    //ID ucitele
    var teacher_id = req.session.user_id;

    //nacteni info
    var course_id = req.body.idKurz;
    const extractedNumber = extractNumber(course_id);
    course_id = extractedNumber;
    console.log("kurz" + course_id);

    var task_name = req.body.jmenoUkolu;
    
    var task_description = req.body.popisUkolu;
    var task_dateEntered = req.body.datumZasaniUkolu;
    var task_deadline = req.body.datumOdevzdaniUkolu;

 
    //INSERT noveho ukolu do databaze
    var insertTaskSQL = 'INSERT INTO task (teacher_id,course_id,task_name,task_description,task_dateEntered,task_deadline) VALUES (?,?,?,?,?,?)';

    db.query(insertTaskSQL,[teacher_id,course_id,task_name,task_description, task_dateEntered, task_deadline], function (err, results) {
        if (err){
            console.log(err);
            req.session.message = { success: false, text:"Něco se pokazilo!"}
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

// Smazani kurzu
router.delete("/kurz", async (req, res) => {
  console.log("spousti se deleteth");
  
  const kurzId = req.query.id; // Získání ID z query stringu
  var deleteKurzSQL = "DELETE FROM course WHERE course_id = ?";
  db.query(deleteKurzSQL,[kurzId], function(err,result){
    if(err){
        console.log(err);
        res.redirect("/classroomUcitel/kurz");

    }else{
        console.log("Course deleted correctly");
        res.redirect("/classroomUcitel/kurz");
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

function extractNumber(input) {
  const match = input.match(/\((\d+)\)/); // Hledá číslo v závorce
  return match ? parseInt(match[1], 10) : null; // Vrátí číslo nebo null, pokud není nalezeno
}
//Kurzy
module.exports = router;