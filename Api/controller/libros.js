const validator = require('validator');
const Libros = require('../model/Libros'); //abstrayendo todos los métodos

//metodo de prueba
const test = (req, res) => {
    return res.status(200).json({
        mensaje: "prueba en el controlador"
    });
}
/*
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
    } */

const crear = async (req, res) => {
    // Recoger parámetros por "post" a guardar
    let parametros = req.body;

    console.log("Parámetros recibidos:", parametros);

    // Validar los datos
    try {
        let validarTitle = !validator.isEmpty(parametros.title) &&
            validator.isLength(parametros.title, { min: 5 });
        let validarAuthor = !validator.isEmpty(parametros.author);
        let validarGenre = !validator.isEmpty(parametros.genre);
        let validarPublishedYear = true; // Validar solo si se envía el campo "publishedYear"
          
        // Si se envía el campo "publishedYear", validamos que sea un número entero y que no sea mayor a la fecha actual
          if (parametros.publishedYear) {
            validarPublishedYear = validator.isInt(parametros.publishedYear.toString(), { min: 1, max: 2024  }); // si se envia, verifique que sea un entero superior a cero y menor al año actual
        }

        console.log("Validación de título:", validarTitle);
        console.log("Validación de autor:", validarAuthor);
        console.log("Validación del género:", validarGenre);
        console.log("Validación del año de publicación:", validarPublishedYear);

       // Si alguna de las validaciones falla, se lanza un error
        if (!validarTitle || !validarAuthor || !validarGenre || !validarPublishedYear) {
            throw new Error("No se ha validado la información, verifique los datos ingresados");
        }
    } catch (error) {
        console.error("Error en validación:", error.message);
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar o los datos no son válidos. Verifique que el título sea mayor a 5 caracteres y que el autor y género no estén vacíos"
        });
    }

    // Crear el objeto a guardar
    const libros = new Libros(parametros);;

    
// Guardar el artículo en la base de datos
    try {
        const LibroGuardado = await libros.save(); // para esperar el resultado de la consulta de la base de datos.
        return res.status(200).json({
            status: "success",
            Libro: LibroGuardado,
            mensaje: "Libro creado con éxito"
        });
    } catch (error) {
        console.error("Error al guardar el libro:", error);
        return res.status(500).json({
            status: "error",
            mensaje: "No se ha guardado el libro"
        });
    }   
};

const listar = async (req, res) => {
    try {
        // Crear la consulta base
        let query = Libros.find({}); // como un select 

        // Ejecutar la consulta
        const libros = await query;

        if (!libros || libros.length === 0) {
            // Si no se encuentran libros, envía una respuesta de error
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado libros en la base de datos"
            });
        }

        // Si se encuentran libros, envía una respuesta de éxito
        return res.status(200).json({
            status: "success",
            libros
        });
    } catch (error) {
        // Si ocurre algún error durante la consulta, envía una respuesta de error
        console.error("Error al listar los libros:", error);
        return res.status(500).json({
            status: "error",
            mensaje: "Error al listar los libros"
        });
    }
};

const detalle = async (req, res) => {
    try {
        // Recoger el ID desde la URL
        let id = req.params.id;
        const libros = await Libros.findById(id);

        // Si no se encuentra el artículo, devolver error
        if (!libros) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el libro seleccionado"
            });
        }

        // Devolver el libro encontrado
        return res.status(200).json({
            status: "success",
            libros
        });

    } catch (error) {
        // Si ocurre un error durante la búsqueda, devolver error
        console.error("Error al buscar el libro:", error);
        return res.status(500).json({
            status: "error",
            mensaje: "Error al buscar el libro"
        });
    }
};

const borrar = async (req, res) => {
    try {

        // Recoger el ID desde la URL
        let id = req.params.id;
        const libros = await Libros.findByIdAndDelete(id);

        // Si no se encuentra el libro, devolver el error
        if (!libros) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el libro a eliminar :"+id
            });
        }

        // Devolver el libro encontrado
        return res.status(200).json({
            status: "success",
            mensaje : "libro eliminado" ,
             libros
            
        });

    } catch (error) {
        // Si ocurre un error durante la busqueda, devolver error
        console.error("Error al buscar el libro:", error);
        return res.status(500).json({
            status: "error",
            mensaje: "Error al buscar el libro seleccionado"
        });
    }
};

const actualizar = async (req, res) => {

    try {
        // Recoger el ID desde la URL
        let id = req.params.id;
        // Recoger los nuevos datos que nos llega en el body
        let parametros = req.body;

        // Validar los datos
        let validarTitle = !validator.isEmpty(parametros.title) &&
            validator.isLength(parametros.title, { min: 5 });
        let validarAuthor = !validator.isEmpty(parametros.author);
        let validarGenre = !validator.isEmpty(parametros.genre);
        let validarPublishedYear = true; // Validar solo si se envía el campo "publishedYear"
         
        // Si se envía el campo "publishedYear", validamos que sea un número entero y que no sea mayor a la fecha actual
         if (parametros.publishedYear) {
            validarPublishedYear = validator.isInt(parametros.publishedYear.toString(), { min: 1, max: 2024  }); // si se envia, verifique que sea un entero superior a cero y menor al año actual
        }
        
        // si algùn dato no se guardo correctamente, devolver el error 
        if (!validarTitle || !validarAuthor || !validarGenre || !validarPublishedYear) {
            return res.status(400).json({
                status: "error",
                mensaje: "Validación de los datos incorrecta. Verifique que el título sea mayor a 5 caracteres y que el autor y género no estén vacíos"
            });
        }

        // Buscar y actualizar el libro
        const libroActualizado = await Libros.findByIdAndUpdate(id, parametros, { new: true }); //devuelvo el nuevo documento

        // Si no se encuentra el libro, devolver error
        if (!libroActualizado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha podido actualizar el libro seleccionado"
            });
        }

        // Devolver el libro actualizado
        return res.status(200).json({
            status: "success",
            mensaje: "Libro actualizado correctamente",
            libros: libroActualizado
        });

    } catch (error) {
        // Si ocurre un error durante la actualización, devolver error
        console.error("Error al actualizar el libro:", error);
        return res.status(500).json({
            status: "error",
            mensaje: "Error al actualizar el libro seleccionado"
        });
    }
};




module.exports = {
    test,
    crear,
    listar,
    detalle,
    borrar, 
    actualizar
}