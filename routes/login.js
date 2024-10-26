const express = require('express');
const router = express.Router();

const db = require('../database');
// LOGIN // REGISTER

router.post('/', (req, res) => {
    if ('login' === req.body.formType) {
        console.log("LOGIN");
        //nactu si informace = vyplnene pole uzivatelem
        var user_email = req.body.log_email;
        var user_password = req.body.log_password;
        console.log( "email:" + user_email + user_password);
        
        
        var selectPassSQL = "SELECT user_password FROM user WHERE user_email = ?";
        db.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            db.query(selectPassSQL,[user_email], function (err, results) {
                if (err) throw err;                
                if(user_password==results[0].user_password){
                    res.redirect("/home")
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
        var user_email = req.body.reg_email;
        var user_firstname = req.body.reg_firstname;
        var user_lastname = req.body.reg_lastname;
        var user_role = req.body.reg_role;
        var user_password = req.body.reg_password;

        //PODMINKY
        // Existuje uz takovy to uzivatel?
        var emailExistsSQL ='SELECT user_email FROM user WHERE user_email = ?;';
        db.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            db.query(emailExistsSQL,[user_email], function (err, results) {
                if (err) throw err;
                if (results.length>0) {
                    console.log("Registrace neprobehla uspesne -> uzivatel existuje");
                }else{
                    console.log("Uzivatel neexistuje");
                    var insertUserSQL = "INSERT INTO user (user_email,user_firstname,user_lastname,user_role,user_password) VALUES (?,?,?,?,?)";
                    db.query(insertUserSQL,[user_email,user_firstname,user_lastname,user_role,user_password], function(err){
                        if (err) throw err;
                        console.log(`Registrace probehla uspesne -> uzivatel ${user_email} pridan do DB`);
                        res.redirect("/home");
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
