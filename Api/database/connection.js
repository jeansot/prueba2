const mongoose = require("mongoose"); //importando la dependencia

const connection = async() => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect("mongodb://127.0.0.1:27017/InventarioLibros");
     
        console.log("conectado a la base datos Inventario de libros");
        
    } catch (error) {
        console.log(error);
        throw new Error ("No se ha podido realizar la conexion a la base de datos" );
    }
}

module.exports = {
    connection //para exportar
}