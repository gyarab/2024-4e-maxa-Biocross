const express = require('express')
const app = express()

app.get("/api", (req,res)=>{
    res.json({"users":["pavel","ondra"]})
})

app.listen(5005, () =>{console.log("Server started on port 5005");})