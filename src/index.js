const express = require("express");
const app = express();
const server = require("http").Server(app);
const router = require("./network/routes");

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
router(app);

// Starting the server
server.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
