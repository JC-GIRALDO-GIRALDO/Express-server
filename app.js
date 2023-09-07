const express = require("express");
const app = express();

app.use(express.json());

const tasks = require("./tasks.json");

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});
// http://localhost:3000/tasks
