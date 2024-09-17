//inicializar base de datos
const {connection}  = require("./database/connection");
const express = require("express");
const { instroducirGenerosBD } = require('./controller/generosLiterarios');


//conectar la base datos
console.log("App inicializada");
//connection(); este se utilizó para cuando solo se tenía un esquema de base de datos
connection().then(() => {
    instroducirGenerosBD(); // Inserta los géneros después de conectar, utilizo el then para que no se ejecute antes de realizar la conexion a mongo
});

// crear servidor de node: 
const app = express(); // APP para peticiones http
const port= 3900;
const cors = require("cors");

//configurar el cors
app.use(cors()); // se usa antes de ejecutar una ruta

//leer y converir body a js
// Configurar middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// crear 0
const rutas_libros = require("./routes/libros.routes");
const rutas_Generos = require("./routes/generosLiterarios.routes");
    

// cargando las rutas
app.use("/api", rutas_libros);
app.use("/api/generosLiterarios", rutas_Generos); //por alguna razon me estaba dando problemas si lo dejaba con solo api como en la de libros

//crear servidor y esperar peticiones
app.listen(port, ()=>{
    console.log("servidor corriendo en el puerto:" + port); // solo para corroborar que esté entrando al listening
});