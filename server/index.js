const express = require("express");
const app = express();
const cors = require("cors");
const taskRouter = require("./routes/taskRouter")
const taskDataBase = require("./models/taskDataBase")

app.use(express.json());
app.use(cors());

app.use("/taskapi", taskRouter)

app.get("/taskapi", (req, res) => {
  res.json(taskDataBase.taskDB);
});

app.listen(3000);
