const readline = require("readline");
const addTask = require("./modules/addTask");
const deleteTask = require("./modules/deleteTask");
const completeTask = require("./modules/completeTask");
const showTasks = require("./modules/showTasks");
const createServer = require("./server");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tasks = [];

async function showMenu() {
  console.log("\nSeleccione una opción:");
  console.log("1. Añadir tarea");
  console.log("2. Eliminar tarea");
  console.log("3. Completar tarea");
  console.log("4. Mostrar tareas");
  console.log("5. Salir");

  const option = await new Promise((resolve) => {
    rl.question("Opción: ", (response) => {
      resolve(response);
    });
  });

  switch (option) {
    case "1":
      await addTask(tasks, rl);
      break;
    case "2":
      await deleteTask(tasks, rl);
      break;
    case "3":
      await completeTask(tasks, rl);
      break;
    case "4":
      showTasks(tasks);
      break;
    case "5":
      rl.close();
      break;
    default:
      console.log("Opción inválida.");
  }

  if (option !== "5") {
    await showMenu();
  }
}

console.log("Bienvenido a la lista de tareas.");
showMenu();
createServer(tasks);

//http://localhost:8080/tasks
