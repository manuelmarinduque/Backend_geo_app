const rol = require('./routes/rol.routes')
const empresa = require('./routes/empresa.routes')
const sede = require("./routes/sede.routes");
const usuario = require('./routes/usuario.routes')
const profesor = require('./routes/profesor.routes')
const grupo = require('./routes/grupo.routes')
const curso = require('./routes/curso.routes')
const asignacion = require('./routes/asignacion.routes')

const express = require("express");
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
app.use('/rol', rol);
app.use('/empresa', empresa);
app.use('/sede', sede);
app.use('/usuario', usuario);
app.use('/profesor', profesor);
app.use('/grupo', grupo);
app.use('/curso', curso);
app.use('/asignacion', asignacion);

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
