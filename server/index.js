const express = require("express");
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(cors());

app.post("/taskapi/post", (req, res) => {
  
});

app.get("/taskapi", (req, res) => {
  res.json(taskDB);
});

app.listen(3000);
