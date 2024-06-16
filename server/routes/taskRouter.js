const express = require("express")
const router = express.Router()
const {taskAdder, taskComplete, taskGetter} = require("../controllers/taskController")

router.get("/", taskGetter)
router.post("/post", taskAdder)
router.put("/put", taskComplete)

module.exports = router