const express = require('express')
const cors = require('cors');

const app = express()

app.use(cors()); //allow cross-origin requests
app.use(express.json());

app.get('/welcome', (req, res) => {
    res.json({ message: "Vítej v biocrossu!" });
});
app.get('/author', (req, res) => {
    res.json({ message: "Autorem je student prestižního gymnazia Arabská. Kryštof Maxa!" });
});

app.listen(5000, () =>{console.log("Server started on port 5000");})