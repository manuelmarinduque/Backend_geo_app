const station = require("./routes/gas_station");
const user = require('./routes/user.routes')

const express = require("express");
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
app.use('/station', station);
app.use('/user', user);

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
