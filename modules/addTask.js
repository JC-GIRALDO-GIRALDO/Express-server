const { v4: uuidv4 } = require("uuid");

module.exports = function addTask(tasks, rl) {
  return new Promise((resolve) => {
    rl.question("Nombre de la tarea: ", (nombre) => {
      rl.question("Descripción de la tarea: ", (descripcion) => {
        console.log("..........................");
        console.log("Añadiendo tarea...");
        setTimeout(() => {
          tasks.push({ id: uuidv4(), nombre, descripcion, completada: false });
          console.log("..........................");
          console.log("Tarea añadida.");
          resolve();
        }, 3000);
      });
    });
  });
};
