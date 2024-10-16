const express = require("express");
const taskController = require("../controller/taskController");
const router = express.Router();

router.post("/", taskController.createTask);

router.get("/", taskController.getTask);

router.get("/:id([0-9a-f]{24})", taskController.getTaskById);

router.get("/search", taskController.search);

router.put("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

module.exports = router;