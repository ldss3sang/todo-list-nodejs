const Task = require("../model/Task");

const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    const newTask = new Task({ task, isComplete });
    await newTask.save();
    res.status(200).json({ status: "ok", data: newTask });
  } catch (error) {
    res.status(400).json({ statu: "fail", error });
  }
};

taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).select("-__v");
    res.status(200).json({ status: "ok", data: taskList });
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};

taskController.updateTask = async (req, res) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const selectedTask = await Task.findOne({ _id: id });
    if (!selectedTask) {
      throw new Error(`Task id ${id} cannot be found`);
    }
    const keys = Object.keys(body);
    keys.map((key) => (selectedTask[key] = body[key]));
    selectedTask.save();
    res.status(200).json({ status: "ok", data: selectedTask });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const deletedTask = await Task.findOneAndDelete({ _id: id });
    if (!deletedTask) {
        throw new Error(`Task id ${id} cannot be found`);
    }
    res.status(200).json({ status: "ok", data: deletedTask });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

module.exports = taskController;
