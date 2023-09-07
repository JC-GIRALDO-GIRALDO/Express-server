const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const tasksFilePath = path.join(__dirname, "../tasks.json");

// Ruta para listar tareas completas
router.get("/completed", (req, res) => {
  try {
    const data = fs.readFileSync(tasksFilePath, "utf8");
    const tasks = JSON.parse(data);
    const completedTasks = tasks.filter((task) => task.isCompleted);
    res.json(completedTasks);
  } catch (err) {
    console.error("Error al leer el archivo JSON:", err);
    res.status(500).json({ error: "Error al leer el archivo JSON" });
  }
});

// Ruta para listar tareas incompletas
router.get("/incomplete", (req, res) => {
  try {
    const data = fs.readFileSync(tasksFilePath, "utf8");
    const tasks = JSON.parse(data);
    const incompleteTasks = tasks.filter((task) => !task.isCompleted);
    res.json(incompleteTasks);
  } catch (err) {
    console.error("Error al leer el archivo JSON:", err);
    res.status(500).json({ error: "Error al leer el archivo JSON" });
  }
});

module.exports = router;