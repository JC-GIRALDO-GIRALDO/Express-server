module.exports = function showTasks(tasks) {
  console.log("Lista de tareas:");
  tasks.forEach((task, index) => {
    console.log(
      `${index}: [${task.completada ? "X" : " "}] ${task.id} - ${
        task.descripcion
      }`
    );
  });
};
