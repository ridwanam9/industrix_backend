module.exports = (app) => {
  const controller = require("../controllers/category.controller");

  app.get("/api/categories", controller.findAll);
  app.post("/api/categories", controller.create);
  app.put("/api/categories/:id", controller.update);
  app.delete("/api/categories/:id", controller.delete);
};
