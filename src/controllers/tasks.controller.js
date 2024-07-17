import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).populate("user");
    res.json(tasks);
  } catch (error) {
    res.send(500).json({ message: "Server error" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const newTask = new Task({ title, description, date, user: req.user.id });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    res.send(500).json({ message: "Server error" });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("user");
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(204).json({ id: task._id });
  } catch (error) {
    res.send(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.send(500).json({ message: "Server error" });
  }
};