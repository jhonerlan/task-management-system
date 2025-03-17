Documentación del Proyecto - Sistema de Gestión de Tareas (CRUD)

Introducción
Este proyecto es una aplicación web para gestionar tareas, donde los usuarios pueden crear, listar, actualizar y eliminar tareas desde una interfaz desarrollada en Angular con un backend en Laravel.

Arquitectura del Proyecto
- **Frontend:** Angular 15+ (SPA - Single Page Application)
- **Backend:** Laravel 9+ (API RESTful)
- **Base de Datos:** MySQL (Eloquent ORM)
- **Consumo de API:** HTTP con Angular HttpClient
- **Autenticación:** No implementada (opcional con Laravel Sanctum)


## Instalación y Configuración

Backend (Laravel)
1 Clonar el repositorio:
   sh
   git clone https://github.com/tu-usuario/task-manager.git
   cd backend

2 Instalar dependencias:
composer install

3 Configurar el archivo .env:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE="nombre de tu base de datos"
DB_USERNAME=root
DB_PASSWORD=

4 Ejecutar migraciones:
php artisan migrate --seed

5 Iniciar el servidor:
php artisan serve


Frontend (Angular)

1.Ir a la carpeta del frontend:
cd frontend

2.Instalar dependencias:
npm install

3.Iniciar el servidor:
ng serve
La aplicación estará disponible en http://localhost:4200


Endpoints de la API
La API está diseñada para gestionar tareas mediante las siguientes rutas:

Método	Ruta	Descripción
GET	/api/tasks	Obtener todas las tareas
POST	/api/tasks	Crear una nueva tarea
GET	/api/tasks/{id}	Obtener una tarea por ID
PUT	/api/tasks/{id}	Actualizar una tarea
DELETE	/api/tasks/{id}	Eliminar una tarea

Ejemplo de respuesta de una tarea:

{
    "id": 1,
    "title": "Ejemplo de tarea",
    "description": "Descripción de la tarea",
    "status": "pending",
    "created_at": "2025-03-16T03:12:53.000000Z",
    "updated_at": "2025-03-16T03:12:53.000000Z"
}

Manejo de Errores
Errores en el backend (Laravel)
Cuando hay un error de validación en Laravel, devuelve un JSON con los detalles:

{
    "message": "Error en la validación",
    "errors": {
        "title": ["El título es obligatorio"]
    },
    "status": 400
}

Errores en el frontend (Angular)
Se usan RxJS y catchError para manejar errores en el cliente:

this.taskService.getTasks().subscribe({
  next: (tasks) => { this.tasks = tasks; },
  error: (error) => { console.error("Error al obtener tareas", error); }
});


Tecnologías Usadas
Frontend: Angular 15+, Angular Material, RxJS

Backend: Laravel 9+, MySQL, Eloquent ORM

Herramientas: Postman, GitHub, VS Code, Composer


Criterios de Evaluación
Funcionalidad completa del CRUD

Calidad del código (Buenas prácticas)

Manejo de errores en frontend y backend

Diseño UI/UX con Angular Material

Documentación clara


Autores
Jhon Erlan Marca Sanchez - Desarrollador FullStack

Postman Collection
Puedes importar la colección de Postman desde el archivo Task_Manager_API.postman_collection
