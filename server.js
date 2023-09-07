const express = require("express");

module.exports = function createServer(tasks) {
  const app = express();

  app.get("/tasks", (req, res) => {
    res.json(tasks);
  });

  app.use((req, res) => {
    res.status(404).send("Not Found");
  });

  const port = 8080;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};
