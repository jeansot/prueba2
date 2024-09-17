const GenerosLiterarios = require('../model/GenerosLiterarios'); // para abstraer todos los mètodos que vaya a necesitar 

const instroducirGenerosBD = async () => {
    try {
        // Verificar si està ingresada, si no para introducirlos
        const generosExist = await GenerosLiterarios.find({});
        if (generosExist.length === 0) {
            // Si no tiene aun los datos, los defino para ingresarlos a la base de datos
            const generosLit = [
                { _id: "1", name: "Ficción" },
                { _id: "2", name: "No Ficción" },
                { _id: "3", name: "Fantasía" },
                { _id: "4", name: "Ciencia Ficción" },
                { _id: "5", name: "Misterio" },
                { _id: "6", name: "Biografía" }
            ];

            // una vez definidos los ingreso
            await GenerosLiterarios.insertMany(generosLit);//para ingresar varios campos
            console.log("los generos literarios fueron insertados correctamente al inicio de la aplicacion");
        } else {
            console.log("los generos literarios ya fueron ingresados a la aplicacion");
        }
    } catch (error) {
        console.error("Error al agregar los generos literarios al iniciar la aplicacion:", error);
    }
};

const listar = async (req, res) => {
    try {
        //creo la consulta en la base de datos
        const generos = await GenerosLiterarios.find({});
        if (generos.length === 0) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se encontraron géneros literarios",
            }); //No se ingresaron por algun motivo al principio de la aplicacion 
        }
        return res.status(200).json({
            status: "success",
            generos,
        }); //se muestran si todo ok
    } catch (error) {
        console.error("Error al listar generos literarios:", error);
        return res.status(500).json({
            status: "error",
            mensaje: "Error al obtener los generos literarios",
        });
    }
};

module.exports = {
    instroducirGenerosBD,
    listar
};
