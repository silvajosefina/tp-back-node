# TP Back Node: Registro de Gastos

API REST desarrollada con Node.js y Express para gestionar gastos personales.

## ¿Qué hace la API y qué rutas expone?

Permite gestionar una colección de gastos personales almacenados en memoria. Las rutas disponibles son:

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/gastos | Retorna todos los gastos. Acepta ?categoria=comida para filtrar |
| GET | /api/gastos/:id | Retorna un gasto por id. Si no existe responde 404 |
| GET | /api/gastos/resumen | Retorna el total gastado y el gasto más alto |
| POST | /api/gastos | Agrega un nuevo gasto con validaciones |
| PUT | /api/gastos/:id | Edita un gasto existente |
| DELETE | /api/gastos/:id | Elimina un gasto. Si no existe responde 404 |
| GET | /api/categorias | Retorna todas las categorías |
| GET | /info | Muestra la cantidad de gastos y la fecha del servidor |

## ¿Cómo se ejecuta?

### Requisitos previos

- Node.js instalado

### Pasos

1. Clonar el repositorio e instalar las dependencias:

```bash
git clone https://github.com/TU_USUARIO/tp-back-node.git
cd tp-back-node
npm install
```

2. Crear un archivo `.env` en la raíz con el siguiente contenido:

    PORT=3001

3. Iniciar el servidor:

```bash
# Modo desarrollo (reinicio automático con nodemon)
npm run dev

# Modo producción
npm start
```

4. La API estará disponible en `http://localhost:3001`

## Conceptos del capítulo 3a de Full Stack Open aplicados

- **Express**: se usó para crear el servidor y definir las rutas de la API.
- **Rutas REST**: se definieron endpoints para cada operación (GET, POST, PUT, DELETE) siguiendo las convenciones REST.
- **Middleware**: se usaron `express.json()` para parsear el body, `morgan` para loguear las requests, `cors` para permitir requests desde el frontend, y un middleware propio de manejo de errores al final de la cadena.
- **Parámetros de ruta y query**: se usó `req.params.id` para obtener el id de la URL y `req.query.categoria` para filtrar por categoría.
- **Códigos de estado HTTP**: se respondió con 201 al crear, 204 al eliminar, 400 para errores de validación y 404 cuando no se encuentra un recurso.
- **Separación de rutas**: la lógica de cada recurso se separó en archivos dentro de la carpeta `routes/`.
- **Variables de entorno**: se usó `dotenv` para leer el puerto desde un archivo `.env`.