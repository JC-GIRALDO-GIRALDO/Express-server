const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const tasksFilePath = path.join(__dirname, "../tasks.json");
const { v4: uuidv4 } = require("uuid");

// Ruta para crear una tarea con nombre y descripción
// http://localhost:3000/list-edit/create
/*
{
  "name": "Tarea",
  "description": "description de la tarea"
}
*/
router.post("/create", (req, res) => {
  try {
    const data = fs.readFileSync(tasksFilePath, "utf8");
    const tasks = JSON.parse(data);
    const { name, description } = req.body;
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
// http://localhost:3000/list-edit/delete/id-de-la-tarea
router.delete("/delete/:id", (req, res) => {
  try {
    const data = fs.readFileSync(tasksFilePath, "utf8");
    const tasks = JSON.parse(data);
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), "utf8");
      res.json({ message: "Tarea eliminada con éxito" });
    } else {
      res.status(404).json({ error: "Tarea no encontrada" });
    }
  } catch (err) {
    console.error("Error al leer o escribir el archivo JSON:", err);
    res.status(500).json({ error: "Error al leer o escribir el archivo JSON" });
  }
});

// Ruta para actualizar una tarea (marcar como completada o editar descripción)
// http://localhost:3000/list-edit/update/id-de-la-tarea
/*
"isCompleted": false,
"name": "Tarea",
"description": "description de la tarea"
*/
router.put("/update/:id", (req, res) => {
  try {
    const data = fs.readFileSync(tasksFilePath, "utf8");
    const tasks = JSON.parse(data);
    const taskId = req.params.id;
    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    if (req.body.description) {
      task.description = req.body.description;
    }

    if (req.body.isCompleted !== undefined) {
      task.isCompleted = req.body.isCompleted;
    }

    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), "utf8");
    res.json(task);
  } catch (err) {
    console.error("Error al leer o escribir el archivo JSON:", err);
    res.status(500).json({ error: "Error al leer o escribir el archivo JSON" });
  }
});

module.exports = router;
