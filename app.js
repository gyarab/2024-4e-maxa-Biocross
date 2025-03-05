var express = require('express');

var app = express();

const session = require("express-session");
const { requireRole } = require('./middleware/auth');

// Middleware pro session (přidej do `app.js`)
app.use(session({
    secret: "tajny-klic",
    resave: false,
    saveUninitialized: true
})); 

//posle session do ejs aby se to nemuselo psat u vseho
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
// view engine setup
app.set('views','views')
app.set('view engine', 'ejs');  // or 'ejs', 'hbs', etc.

// Middleware pro praci s JSON a URL daty
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Nastavení statickych souboru
app.use(express.static('public'));

// Nastaveni portu
const PORT = process.env.PORT || 3000;

//LOGIN stranka
//gets
app.get("/login",(req,res)=>{
  let message = req.session.message;
  req.session.message = null;
  res.render("login", {message})
})

//Domovska stranka
//Domovska stranka
//gets
//Domovska stranka
app.get("/",(req,res)=>{
  res.render("homepage")
})

//Crossing stranka
//gets
app.get("/crossing",(req,res)=>{
  res.render("crossing")
})
//Literatura stranka
//gets
app.get("/pojmy",(req,res)=>{
  res.render("literatura")
})

//Classroom stranka
//gets

const getCourses = require('./routes/methods/getCourses')

// if(id=ucitel){classroomUcitel} if student classroom student
app.get("/classroom",requireRole("student"), async(req,res)=>{
  let message = req.session.message;
  req.session.message = null; // Vyčistíme zprávu po zobrazení
  var student_id = req.session.user_id;
  // nactu existujici kurzy uzivatele
  var arrCourses = await getCourses.getCourses(student_id)

  try {
    res.format({
      html: async () => {
        res.render("classroom", { message });
      },
      json: () => {   
        res.json(arrCourses);
      }
    }); 
  } catch (err){
    console.error(err);
    res.status(500).send('Server Error');
  }
  
  // res.render("classroom", { message });
});


//ClassroomUcitel stranka
const getCoursesTeacher = require('./routes/methods/getCoursesTeacher')

//gets
app.get("/classroomUcitel",requireRole("teacher"), async(req,res)=>{
  let message = req.session.message;
  req.session.message = null; // Vyčistíme zprávu po zobrazení
  var user_id = req.session.user_id;
  
      // nejdriv si nactu vsechny kurzy ktere mam k tomuto uciteli
      var arrCourses = await getCoursesTeacher.getCoursesTeacher(user_id);
      try {
          res.format({
            html: async () => {
              res.render('classroomUcitel', {message}); //new kurz          
          },json: () => {   
              res.json(arrCourses);
            }
          }); 
        } catch (err){
          console.error(err);
          res.status(500).send('Server Error');
        }
})

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
        return res.status(500).json({ success: false, message: "Chyba při odhlašování" });
    }
    res.redirect("/login"); // Přesměrování na login stránku
});
});


//DEVELOPMENT HTML
// app.get("/navbar",(req,res)=>{
//   res.render("navbar")
// })

// app.get("/footer",(req,res)=>{
//   res.render("footer")
// })
//routers
// const registerRouter = require("./routes/register")
// app.use('/register', registerRouter)

//ROUTERS
//login
const loginRouter = require("./routes/login");
app.use("/login", loginRouter);
//classroom
const classroomRouter = require("./routes/classroom");
app.use("/classroom", classroomRouter);

//classroomUcitel
const classroomUcitelRouter = require("./routes/classroomUcitel");
app.use("/classroomUcitel", classroomUcitelRouter);


app.listen(PORT, ()=>{
  console.log(`Aplikace běží na http://localhost:${PORT}`);
  
})
