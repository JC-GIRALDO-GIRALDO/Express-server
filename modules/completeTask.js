module.exports = function completeTask(tasks, rl) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("..........................");
      rl.question("Índice de la tarea completada: ", (index) => {
        if (index >= 0 && index < tasks.length) {
          tasks[index].completada = true;
          console.log("..........................");
          console.log("Tarea completada.");
        } else {
          console.log("..........................");
          console.log("Índice inválido.");
        }
        resolve();
      });
    }, 3000);
  });
};
