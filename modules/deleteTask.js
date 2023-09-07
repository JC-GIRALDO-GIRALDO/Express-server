module.exports = function deleteTask(tasks, rl) {
  return new Promise((resolve) => {
    console.log("..........................");
    console.log("Eliminando tarea de la lista");
    setTimeout(() => {
      rl.question("Índice de la tarea a eliminar: ", (index) => {
        if (index >= 0 && index < tasks.length) {
          tasks.splice(index, 1);
          console.log("..........................");
          console.log("Tarea eliminada.");
        } else {
          console.log("Índice inválido.");
        }
        resolve();
      });
    }, 3000);
  });
};
