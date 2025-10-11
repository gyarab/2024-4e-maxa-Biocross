const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Složka pro dočasné uložení souboru
const fs = require('fs');  // Tohle musíš přidat na začátek souboru


const router = express.Router();
const {requireRole} = require("../middleware/auth");
const db = require('../database');

const getCourses = require('./methods/getCourses')
const getTasks = require('./methods/getTasks')

// praci s pdf jsem vygeneroval pomoci umele inteligence
//Ukoly
router.get("/ukoly",requireRole("student"), async(req,res)=>{
    let student_id = req.session.user_id; // 💡 Tady bereme student_id ze session

    var arrCourses = await getCourses.getCourses(student_id)
    var arrTasks = await getTasks.getTasks(student_id);
    console.log(arrTasks);
    console.log("Tohle jsou tasky");
    
    
    try {
      res.format({
        html: async () => {
          res.render("classroomUkoly");
        },
        json: () => {   
          res.json({ tasks: arrTasks, courses: arrCourses });
        }
      }); 
    } catch (err){
      console.error(err);
      res.status(500).send('Server Error');
    }
});

//Ukoly
router.get("/kurz",requireRole("student"), async(req,res)=>{
  let student_id = req.session.user_id; // 💡 Tady bereme student_id ze session

  var arrCourses = await getCourses.getCourses(student_id)
  // var arrTasks = await getTasks.getTasks(student_id);
  var course_id = req.query.id;
  var arrTasksKurz = await getTasks.getTasksKurz(course_id);
  console.log(arrTasksKurz);
    
  try {
    res.format({
      html: async () => {
        res.render("classroomKurz");
      },
      json: () => {   
        res.json({ tasks: arrTasksKurz, courses: arrCourses });
      }
    }); 
  } catch (err){
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//odevzdani pdf 
router.post("/kurz",requireRole("student"), upload.single('taskFile'), async(req,res)=>{
  var course_id = req.query.id;
  let student_id = req.session.user_id; // 💡 Tady bereme student_id ze session
  const file = req.file;
  var task_id = req.body.taskId;
  console.log(task_id + "task");
  

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }
  // Načtení PDF souboru do paměti (binary data)
  const pdfData = fs.readFileSync(file.path);
  const query = 'INSERT INTO donetasks (task_id, course_id, student_id, donetasks_pdf) VALUES (?,?, ?, ?)';
  db.execute(query, [ task_id, course_id, student_id, pdfData], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Error saving to the database');
      }
      res.redirect("/classroom");
      console.log("Ukol uspesne odevzdan");
      
  });
  console.log("Provedl se post");

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
