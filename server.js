// const express = require("express");
// const cors = require("cors");
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({ message: "Industrix Todo API running..." });
// });

// require("./routes/todo.routes")(app);
// require("./routes/category.routes")(app);

// const app = require("./app");

// const PORT = 5000;
// app.listen(PORT, () => console.log("Server running on port " + PORT));

const app = require("./app");

const PORT = 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
