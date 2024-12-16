const express = require('express');
const router = express.Router();
const db = require('../database.js');

//Ukoly
router.get("/novyKurz", (req,res)=>{
    res.render('classroomNewKurz');
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