const express = require('express');
const router = express.Router();

const db = require('../database');
// LOGIN // REGISTER

router.post('/', (req, res) => {
    //napad na vyreseni login a registrace pri stejnem HTTP req.(POST) 
    // https://stackoverflow.com/questions/66640958/having-login-and-register-on-the-same-page-nodejs
    if ('login' === req.body.formType) {
        console.log("LOGIN");
        //nactu si informace = vyplnene pole uzivatelem
        var student_email = req.body.log_email;
        var student_password = req.body.log_password;
        console.log( "email:" + student_email + student_password);
        
        
        var selectPassSQL = "SELECT student_password FROM student WHERE student_email = ?";
        db.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            db.query(selectPassSQL,[student_email], function (err, results) {
                if (err) throw err;                
                if(student_password==results[0].student_password){
                    res.redirect("/")
                    console.log("Prihlaseni probehlo uspesne -> Jste prihlasen");
                }else{
                    console.log("Prihlaseni neprobehlo uspesne -> Chybne heslo");
                    res.redirect("/login")
                }
            });
        });
        
      // Server-sided sign-up logic can go here...
    } else if ('register' === req.body.formType) {
        console.log("REGISTER");
        //nactu si informace = vyplnene pole uzivatelem
        var student_email = req.body.reg_email;
        var student_firstname = req.body.reg_firstname;
        var student_lastname = req.body.reg_lastname;
        var student_role = req.body.reg_role;
        var student_password = req.body.reg_password;

        //PODMINKY
        // Existuje uz takovy to uzivatel?
        var emailExistsSQL ='SELECT student_email FROM student WHERE student_email = ?;';
        db.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            db.query(emailExistsSQL,[student_email], function (err, results) {
                if (err) throw err;
                if (results.length>0) {
                    console.log("Registrace neprobehla uspesne -> uzivatel existuje");
                }else{
                    console.log("Uzivatel neexistuje");
                    var insertUserSQL = "INSERT INTO student (student_email,student_firstname,student_lastname,student_role,student_password) VALUES (?,?,?,?,?)";
                    db.query(insertUserSQL,[student_email,student_firstname,student_lastname,student_role,student_password], function(err){
                        if (err) throw err;
                        console.log(`Registrace probehla uspesne -> uzivatel ${student_email} pridan do DB`);
                        res.redirect("/");
                    });
                }
            });
        });
        // KONTROLA HESLA ATD BUDOU VE SCRIPTU PRO LOGIN

        
    } else {
      // Something/someone has submitted an invalid form?
    }
});





module.exports = router;
