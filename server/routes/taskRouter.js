const express = require("express")
const router = express.Router()
const {taskAdder} = require("../controllers/taskController")

router.post("/post", taskAdder)

module.exports = router