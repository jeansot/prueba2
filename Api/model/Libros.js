/*○ Define el esquema de Mongoose para un libro con los siguientes
campos:
■ title: String (obligatorio)
■ author: String (obligatorio)
■ genre: String (obligatorio, debe ser uno de los géneros
en el catálogo)
■ publishedYear: Number (opcional)*/

//crear el esquema para poder crear más libros 
const { default: mongoose } = require("mongoose");
//crear modelo 
const {Schema, model} = mongoose;
const librosSchema = Schema({
    title: {
        type: String,
        required:true
    },
    author: {
        type: String, 
        required: true
    },
    genre: {
        type: String, 
        require : true
    },
    publishedYear: {
        type: Number,
        require: false
    }

});
//exporto el modelo y uso la colección "libros"
module.exports= model("Libros", librosSchema,"libros");

