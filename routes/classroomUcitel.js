const express = require('express');
const router = express.Router();
const db = require('../database.js');

//Ukoly
router.get("/novyKurz", (req,res)=>{
    res.render('classroomNewKurz'); //new kurz
});


//UKOLY

//Nacteni stranky ukoly
router.get("/ukoly", (req,res)=>{
    res.render('classroomUcitelUkoly');
});

//Pridani noveho ukolu
router.post("/ukoly", (req,res)=>{
    //nacteni info 
    var ukol_jmeno = req.body.jmenoUkolu;
    var ukol_popis = req.body.popisUkolu;
    var ukol_datumOdevzdani = req.body.datumOdevzdaniUkolu;
    var ukol_kurz = req.body.jmenoKurzu;

    //id ucitele - jeste nefunguje
    var ucitel_id = 1;
    //INSERT noveho ukolu do databaze
    var insertTaskSQL = "INSERT INTO student_course (student_id, course_id) SELECT 1, course_id FROM course WHERE course_code = ?;";
    db.connect(function (err) {
        if (err) throw err;
        db.query(insertCourseSQL,[course_code], function (err, results) {
            if (err) throw err;                
            else {
                console.log("Kurz pridan");
            }
        });
    });
});

router.post("/novyKurz", (req,res)=>{

    const inputData = {
        course_name: req.body.courseName,
        course_teacherName:  req.body.teachersName,
        course_className: req.body.className,
        course_year: req.body.courseYear,
    }

    //prepsat to bez sql injection = hotove
     var sql = "INSERT INTO course(course_name,course_teacherName,course_className,course_year) VALUES (?,?,?,?)";

    db.query(sql,[inputData.course_name,inputData.course_teacherName,inputData.course_className,inputData.course_year], function(err,result){
        if(err) throw err
        console.log("Course add correctly?");
    });


    res.render('classroomNewKurz');
});

//kazdy kurz ma svuj random kod, musi byt unikatni 
//pdoivat se do DB jestli jiz existuje?
function createCode(params) {
    var sql = "SELECT course(course_code) WHERE VALUES ";

    db.query(sql,[inputData.course_name,inputData.course_teacherName,inputData.course_className,inputData.course_year], function(err,result){
        if(err) throw err
        console.log("Course add correctly?");
    });
}
//Kurzy
module.exports = router;