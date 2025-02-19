const express = require('express');
const router = express.Router();

//Ukoly
router.get("/ukoly", (req,res)=>{
    res.render('classroomUkoly');
});

router.post("/", (req,res)=>{
    course_code = req.body.input_course;

    var insertCourseSQL = "INSERT INTO student_course (student_id, course_id) SELECT 1, course_id FROM course WHERE course_code = ?;";
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

//Kurzy
module.exports = router;