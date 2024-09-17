Aplicación de Gestión de Libros
Esta es una aplicación web para gestionar una colección de libros, como practica de aptitudes de desarrollo.

Características
CRUD de libros: Agregar, listar, editar y eliminar libros.
Gestión de géneros: Ver  géneros literarios.
Búsqueda: Buscar libros por Id.
Interfaz : Utiliza Bootstrap para un diseño adaptable.
Tecnologías
Frontend: Angular 18, Bootstrap.
Backend: Node.js, Express.js, MongoDB, Mongoose.

Instalación

git clone https://github.com/your-repo-url.git



Instalando dependencias:

Backend:
(Iniciar desde raiz del proyecto)
cd Api
npm install

Frontend:
(Iniciar desde raiz del proyecto)
cd App
cd frontAngular
npm install


Iniciar la aplicación:

Backend:
(Iniciar desde raiz del proyecto)
cd Api

npm runstart start
Servidor disponible en http://localhost:3900.

Frontend:
(Iniciar desde raiz del proyecto)
cd App
cd frontAngular
ng serve --o
Aplicación disponible en http://localhost:4200.

Rutas API
GET /api/listar: Listar todos los libros.
GET /api/libros/:id: Obtener libro por ID.
POST /api/libros: Agregar un libro.
PUT /api/libros/:id: Actualizar un libro.
DELETE /api/libros/:id: Eliminar un libro.
GET /api/generosLiterarios/listar: Listar géneros literarios.

Licencia
Este proyecto está bajo la licencia MIT.