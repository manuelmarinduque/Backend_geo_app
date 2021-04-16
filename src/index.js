const express = require("express");
const SocketIO = require('socket.io');
const path = require('path');

const rol = require('./routes/rol.routes')
const empresa = require('./routes/empresa.routes')
const sede = require("./routes/sede.routes");
const usuario = require('./routes/usuario.routes')
const profesor = require('./routes/profesor.routes')
const grupo = require('./routes/grupo.routes')
const curso = require('./routes/curso.routes')
const asignacion = require('./routes/asignacion.routes')
const mysqlConnection = require('./database');


// Settings

const app = express();
app.set("port", 3000);

// Middlewares
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'),
  res.header('Access-Control-Allow-Headers', '*'),
  res.header('Access-Control-Allow-Methods', '*'),
  res.header('Allow', '*');
  next();
});

// app.use(express.static(path.join(__dirname, 'public')));

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
const server = app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});

// Websockets  
const io = SocketIO(server,{
  cors: {
    origin: "*",
    methods: ["GET", "POST","DELETE", "PUT"],
    allowedHeaders: ["*"],
    credentials: false
  }
});

io.on('connection', (socket) => {

  socket.on('sede:listar_sedes', (data) => {
    mysqlConnection.query(`SELECT * FROM sede WHERE estado=1`, (error, row) => {
      error ? io.sockets.emit('sede:listar_sedes', { message: error.sqlMessage }) : io.sockets.emit('sede:listar_sedes', { data: row });
    })
  })

  socket.on('sede:crear_sede', (data) => {
    mysqlConnection.query('INSERT INTO sede SET ?', data, (error) => {
      error ? io.sockets.emit('sede:crear_sede', { message: error.sqlMessage }) : io.sockets.emit('sede:crear_sede', { message: "Sede creada satisfactoriamente." })
    })
  })

  socket.on('sede:editar_sede', (data) => {
    const { nombre_sede, id_empresa, direccion, latitud, longitud, telefono, ciudad, id_sede } = data
    mysqlConnection.query('UPDATE sede SET nombre_sede=?, id_empresa=?, direccion=?, latitud=?, longitud=?, telefono=?, ciudad=? WHERE id_sede=? AND estado=1',
      [nombre_sede, id_empresa, direccion, latitud, longitud, telefono, ciudad, id_sede],
      (error) => {
        error ? io.sockets.emit('sede:editar_sede', { message: error.sqlMessage }) : io.sockets.emit('sede:editar_sede', { message: "Sede actualizada satisfactoriamente." })
      })
  })

  socket.on('sede:eliminar_sede', (data) => {
    mysqlConnection.query('INSERT INTO sede SET ?', data, (error) => {
      error ? io.sockets.emit('sede:eliminar_sede', { message: error.sqlMessage }) : io.sockets.emit('sede:eliminar_sede', { message: "Sede eliminada satisfactoriamente." })
    })
  })

})