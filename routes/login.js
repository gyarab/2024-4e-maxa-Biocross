const express = require('express');
const router = express.Router();

const db = require('../database');
// LOGIN // REGISTER

router.post('/', (req, res) => {
    var user_role = req.body.role; // Přidáme roli z formuláře (student nebo teacher)
    var user_email = req.body.log_email;
    var user_password = req.body.log_password;

    //napad na vyreseni login a registrace pri stejnem HTTP req.(POST) 
    // https://stackoverflow.com/questions/66640958/having-login-and-register-on-the-same-page-nodejs
    if ('login' === req.body.formType) {
        if (user_role === "student") {
            var selectPassSQL = "SELECT student_id, student_password FROM student WHERE student_email = ?";
            db.query(selectPassSQL, [user_email], function (err, results) {
                if (err) console.log();
                ;
                
                if ( results.length > 0 && user_password == results[0].student_password) {
                    console.log("Přihlášení studenta proběhlo úspěšně");
                    req.session.user_id = results[0].student_id;
                    req.session.role = "student"; // Uložíme roli
                    req.session.user_email = user_email;
                    req.session.message = null;
                    res.redirect("/");
                } else {
                    console.log("Neplatný email nebo heslo pro studenta");
                    req.session.message = { text: "Neplatný email nebo heslo!", success: false };
                    res.redirect("/login");
                }
            });
        } else if (user_role === "teacher") {
            var selectPassSQL = "SELECT teacher_id, teacher_password FROM teacher WHERE teacher_email = ?";
            db.query(selectPassSQL, [user_email], function (err, results) {
                if (err) throw err;

                if ( results.length > 0 && user_password == results[0].teacher_password) {
                    console.log("Přihlášení učitele proběhlo úspěšně");
                    req.session.user_id = results[0].teacher_id;
                    req.session.role = "teacher"; // Uložíme roli
                    req.session.user_email = user_email;
                    req.session.message = null;
                    res.redirect("/");
                } else {
                    console.log("Neplatný email nebo heslo pro učitele");
                    req.session.message = { text: "Neplatný email nebo heslo!", success: false };
                    res.redirect("/login");
                }
            });
        }
        
    } else if ('register' === req.body.formType) {
        var user_email = req.body.reg_email;
        var user_firstname = req.body.reg_firstname;
        var user_lastname = req.body.reg_lastname;
        var user_role = req.body.role_register; // Student nebo Teacher
        var user_password = req.body.reg_password;

        if (user_role === "student") {
            //kontrola jestli uzivatel uz existuje
            var kontrolaUzivateleSQL = "SELECT * FROM student WHERE student_email = ?";
            
            db.query(kontrolaUzivateleSQL, [user_email], function (err, results) {
                if (err) throw err;
        
                if (results.length > 0) {
                    req.session.message = { text: "Tento e-mail je již registrován!", success: false };
                    return res.redirect("/login");
                }
        
                var insertUserSQL = "INSERT INTO student (student_email, student_firstname, student_lastname, student_password) VALUES (?,?,?,?)";
        
                db.query(insertUserSQL, [user_email, user_firstname, user_lastname, user_password], function (err, result) {
                    if (err) throw err;
        
                    console.log(`Registrace studenta proběhla úspěšně -> ${user_email}`);
                    // req.session.user_id = result.insertId; // ID nového studenta
                    // req.session.role = "student"; // Nastavíme roli
                    req.session.message = { text: "Registrace proběhla úspěšně!", success: true };
        
                    res.redirect("/login");
                });
            });
        
        } else if (user_role === "teacher") {
            var checkUserSQL = "SELECT * FROM teacher WHERE teacher_email = ?";
            
            db.query(checkUserSQL, [user_email], function (err, results) {
                if (err) throw err;
        
                if (results.length > 0) {
                    req.session.message = { text: "Tento e-mail je již registrován!", success: false };
                    return res.redirect("/login");
                }
        
                var insertUserSQL = "INSERT INTO teacher (teacher_firstname, teacher_lastname, teacher_email, teacher_password) VALUES (?,?,?,?)";
        
                db.query(insertUserSQL, [user_firstname, user_lastname, user_email, user_password], function (err, result) {
                    if (err) throw err;
        
                    console.log(`Registrace učitele proběhla úspěšně -> ${user_email}`);
                    // req.session.user_id = result.insertId; // ID učitele
                    // req.session.role = "teacher"; // Nastavíme roli
                    req.session.message = { text: "Registrace proběhla úspěšně!", success: true };
        
                    res.redirect("/login");
                });
            });
        }
    } 
});
 




module.exports = router;
