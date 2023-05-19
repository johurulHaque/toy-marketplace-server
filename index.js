const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

const toys = require("./data/toy.json");

app.get("/toys", (req, res) => {
  res.send(toys);
});

app.get('/toy/:id', (req, res) => {
    const id = req.params.id; 
    const selectedToy = toys.find(n => n.id == id);
    res.send(selectedToy)
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
