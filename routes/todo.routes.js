module.exports = (app) => {
  const controller = require("../controllers/todo.controller");

  app.get("/api/todos", controller.findAll);
  app.post("/api/todos", controller.create);
  app.get("/api/todos/:id", controller.findOne);
  app.put("/api/todos/:id", controller.update);
  app.delete("/api/todos/:id", controller.delete);
  app.patch("/api/todos/:id/complete", controller.toggleComplete);
};
