var express = require('express');

var app = express();


// view engine setup
app.set('views','views')
app.set('view engine', 'ejs');  // or 'ejs', 'hbs', etc.

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))


// Set the port 
const PORT = process.env.PORT || 3000;


//Domovska stranka
//gets
app.get("/home",(req,res)=>{
  res.render("homepage",
    {
    heroTitle: 'Welcome to My Website',
    heroSubtitle: 'This is a dynamic subtitle rendered by EJS.',
    heroImage: '/images/alel.png'
  })
})
//routers
// const registerRouter = require("./routes/register")
// app.use('/register', registerRouter)




app.listen(PORT, ()=>{
  console.log(`Aplikace běží na http://localhost:${PORT}`);
  
})
