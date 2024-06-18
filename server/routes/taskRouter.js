const express = require("express")
const router = express.Router()
const {taskAdder, taskComplete, taskGetter, taskDelete} = require("../controllers/taskController")

router.get("/", taskGetter)
router.post("/post", taskAdder)
router.put("/put", taskComplete)
router.delete("/delete", taskDelete)

module.exports = router