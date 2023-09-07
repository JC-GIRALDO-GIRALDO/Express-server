const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const listViewRouter = require("./routers/list-view-router");
const listEditRouter = require("./routers/list-edit-router");

app.use(express.json());

const tasksFilePath = path.join(__dirname, "tasks.json");

app.get("/tasks", (req, res) => {
  try {
    const data = fs.readFileSync(tasksFilePath, "utf8");
    const tasks = JSON.parse(data);
    res.json(tasks);
  } catch (err) {
    console.error("Error al leer el archivo JSON:", err);
    res.status(500).json({ error: "Error al leer el archivo JSON" });
  }
});

app.use("/list-view", listViewRouter);
app.use("/list-edit", listEditRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});

// http://localhost:3000/tasks
