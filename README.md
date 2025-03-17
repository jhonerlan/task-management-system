Sistema de Gestión de Tareas (CRUD)

Este es un proyecto FullStack que permite gestionar tareas utilizando **Angular** en el frontend y **Laravel** en el backend.

 Características

- Listado de tareas
- Crear, editar y eliminar tareas
- Cambiar estado de tareas
- Diseño responsive con Angular Material
- API RESTful con Laravel
- Validaciones en el backend y frontend

---

Instalación y Configuración:
Backend (Laravel)

1.Ir a la carpeta del backend:
   
cd backend

2.instalar dependencias:

composer install

3.configurar la base de datos en .nev:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE="nombre de tu base de datos"
DB_USERNAME=root
DB_PASSWORD=

mi caso use xampp
Debe Crear La Base De Datos Con El Nombre Que Le Corresponde

4.Ejecutar migraciones:

php artisan migrate --seed

5.Iniciar el servidor:

php artisan serve


6.la api respondera a la direccion: http://127.0.0.1:8000/api/tasks
en postman podemos ejecutar el CRUD 

GET	/api/tasks	Obtener todas las tareas
POST	/api/tasks	Crear una nueva tarea
GET	/api/tasks/{id}	Obtener una tarea por ID
PUT	/api/tasks/{id}	Actualizar una tarea
DELETE	/api/tasks/{id}	Eliminar una tarea

lo puede ejecutar con postman para verificar que la api funciona al 100%
