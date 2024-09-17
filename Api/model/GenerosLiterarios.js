/*
○ Define el esquema de Mongoose para el catálogo de géneros
literarios con los siguientes campos:
■ _id: String (obligatorio)
■ name: String (obligatorio)
*/
//crear el esquema para poder crear más libros 
const { default: mongoose } = require("mongoose");
//crear modelo 
const {Schema, model} = mongoose;
const generosLiterariosSchema = Schema({
    _id: {
        type: String,
        required:true
    },
    name: {
        type: String, 
        required: true
    }

});
//exporto el modelo y uso la colección "libros"
module.exports= model("GenerosLiterarios", generosLiterariosSchema,"generosLiterarios");