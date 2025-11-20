const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Industrix Todo API running..." });
});

require("./routes/todo.routes")(app);
require("./routes/category.routes")(app);

module.exports = app;
