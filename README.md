# To-Do App - Backend / Jose Tubac 14010289

Este es el backend del proyecto "To-Do List", desarrollado con **Node.js**, **Express** y conectado a una base de datos **MySQL**.

Permite agregar, eliminar y listar tareas y metas personales mediante endpoints REST protegidos con una API Key.

## Tecnologías utilizadas

- Node.js
- Express
- MySQL
- dotenv

## Estructura de la base de datos

```sql
CREATE DATABASE todo_app;

USE todo_app;

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  dueDate DATE
);

CREATE TABLE goals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  dueDate DATE
);


Instrucciones para ejecutar el backend
Clonar el repositorio:

git clone https://github.com/JoseTubac1/To-Do-Backend.git
cd To-Do-Backend

Instalar dependencias:npm install

Ejecutar el servidor:
node index.js
El servidor se ejecutará en: http://localhost:3000

Endpoints disponibles
Método	Ruta	Descripción
GET	/getTasks	Obtener todas las tareas
GET	/getGoals	Obtener todas las metas
POST	/addTask	Agregar una tarea
POST	/addGoal	Agregar una meta
DELETE	/removeTask	Eliminar tarea por ID
DELETE	/removeGoal	Eliminar meta por ID

Seguridad
Todos los endpoints requieren un header de autenticación:
Authorization: 123@
