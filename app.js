var express = require('express');

var app = express();


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
  res.render("login")
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
app.get("/literatura",(req,res)=>{
  res.render("literatura")
})

//Classroom stranka
//gets

// const getCurses = require('./routes/methods/getCurses')

// if(id=ucitel){classroomUcitel} if student classroom student
app.get("/classroom", async(req,res)=>{
  // nactu existujici kurzy uzivatele
  var arrCurses = await getCurses.getCurses()

  try {
    res.format({
      html: async () => {
        res.render("classroom")
      },
      json: () => {   
        res.json(arrCurses);
      }
    }); 
  } catch (err){
    console.error(err);
    res.status(500).send('Server Error');
  }
  
    res.render("classroom")
});


//ClassroomUcitel stranka
//gets
app.get("/classroomUcitel",(req,res)=>{
  res.render("classroomUcitel")
})




//DEVELOPMENT HTML
app.get("/navbar",(req,res)=>{
  res.render("navbar")
})

app.get("/footer",(req,res)=>{
  res.render("footer")
})
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
