const express = require('express');
const router = express.Router();

//Ukoly
router.get("/ukoly", (req,res)=>{
    res.render('classroomUkoly');
});

//Kurzy
module.exports = router;