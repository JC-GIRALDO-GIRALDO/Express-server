// tasks-router.js
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const tasksFilePath = path.join(__dirname, "../tasks.json");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

// Middleware para validar parámetros
router.use("/:param", (req, res, next) => {
  const param = req.params.param;

  if (param === "completed" || param === "incomplete") {
    next();
  } else {
    res.status(400).json({ error: "Parámetro no válido" });
  }
});

// Ruta para crear una tarea con nombre y descripción
router.post("/create", (req, res) => {
  try {
    const data = fs.readFileSync(tasksFilePath, "utf8");
    const tasks = JSON.parse(data);
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        error: "Solicitud POST con cuerpo vacío o atributos faltantes",
      });
    }

    const newTask = {
      id: uuidv4(),
      isCompleted: false,
      name,
      description,
    };
    tasks.push(newTask);
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), "utf8");
    res.json(newTask);
  } catch (err) {
    console.error("Error al leer o escribir el archivo JSON:", err);
    res.status(500).json({ error: "Error al leer o escribir el archivo JSON" });
  }
});

// Ruta para eliminar una tarea
router.delete("/delete/:id", (req, res) => {
  try {
    const data = fs.readFileSync(tasksFilePath, "utf8");
    const tasks = JSON.parse(data);
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), "utf8");
      res.status(204).json(); // Código de estado 204 para No Content
    } else {
      res.status(404).json({ error: "Tarea no encontrada" });
    }
  } catch (err) {
    console.error("Error al leer o escribir el archivo JSON:", err);
    res.status(500).json({ error: "Error al leer o escribir el archivo JSON" });
  }
});

// Ruta para actualizar una tarea
router.put("/update/:id", (req, res) => {
  try {
    const data = fs.readFileSync(tasksFilePath, "utf8");
    const tasks = JSON.parse(data);
    const taskId = req.params.id;
    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    if (!req.body || (!req.body.name && !req.body.description)) {
      return res.status(400).json({
        error: "Solicitud PUT con cuerpo vacío o atributos faltantes",
      });
    }

    if (req.body.description) {
      task.description = req.body.description;
    }

    if (req.body.isCompleted !== undefined) {
      task.isCompleted = req.body.isCompleted;
    }

    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), "utf8");
    res.status(200).json(task); // Código de estado 200 para OK
  } catch (err) {
    console.error("Error al leer o escribir el archivo JSON:", err);
    res.status(500).json({ error: "Error al leer o escribir el archivo JSON" });
  }
});

// Ruta para listar tareas completas
router.get("/completed", (req, res) => {
  try {
    const data = fs.readFileSync(tasksFilePath, "utf8");
    const tasks = JSON.parse(data);
    const completedTasks = tasks.filter((task) => task.isCompleted);
    res.status(200).json(completedTasks);
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
    res.status(200).json(incompleteTasks);
  } catch (err) {
    console.error("Error al leer el archivo JSON:", err);
    res.status(500).json({ error: "Error al leer el archivo JSON" });
  }
});

module.exports = router;
