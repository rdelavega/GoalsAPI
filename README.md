# Goals API

# Descripcion del proyecto

Este es un proyecto de una API CRUD hecha con Node.js y el framework Express.js, el objetivo del proyecto es practicar fundamentos del desarrollo backend, manejo de errores, logica, edge cases y modularizacion sin ningun tipo de apoyo de LLM's, usando unicamente documentacion oficial sin copiar el codigo literal de la documentacion y con el apoyo de foros de desarrolladores como lo es Stack Overflow.

El proyecto utiliza un JSON como base de datos, el objetivo de la API es registrar, leer, borrar, actualizar y completar tareas o goals (metas)

# Estructura del proyecto

```markdown
src/
├─ controllers/
│ └─ goals.controller.js // lógica de negocio
├─ routes/
│ └─ goals.routes.js // define endpoints
├─ middlewares/
│ └─ errorHandler.js // manejo centralizado de errores
├─ data/
│ └─ goals.json
├─ utils/
│ └─ validateGoal.js // funciones auxiliares
└─ app.js // setup y registro de rutas
```

# Endpoints

La aplicacion utiliza los siguientos endpoints:

### GET

- `/api/goals` ---> Obtener de todas las metas
- `/api/goals/:id` ---> Obtener meta segun id
- `/api/goals/status?q=complete` ---> Obtener metas completas
- `/api/goals/status?q=incomplete` ---> Obtener metas incompletas

### POST

- `/api/goals` ---> Crear una meta (id, name, start_date, end_date, completed)
- `/api/goals/:id/validate?q=complete` ---> Marcar meta como completa
- `/api/goals/:id/validate?q=incomplete` ---> Marcar meta como incompleta

### PUT

- `/api/goals/:id` ---> Actualizar meta

### DELETE

- `/api/goals/:id` ---> Borrar meta

# Ejemplo de respuesta

## GET

- `/api/goals`

  ```json
  {
    "status": 200,
    "message": "Goals",
    "data": {
      "goals": [
        {
          "id": 1,
          "name": "Study programming",
          "start_date": "14/08/2024",
          "end_date": "26/07/2026",
          "completed": true
        },
        {
          "id": 2,
          "name": "Go to the gym",
          "start_date": "10/02/2022",
          "end_date": "27/07/2027",
          "completed": false
        },
        {
          "id": 3,
          "name": "Achieve 12% body fat",
          "start_date": "02/10/2025",
          "end_date": "13/01/2026",
          "completed": false
        },
        {
          "id": 7,
          "name": "Practice Express.js",
          "start_date": "29/10/2025",
          "end_date": "15/03/2026",
          "completed": false
        }
      ]
    }
  }
  ```

## POST:

- `/api/goals`

### Ejemplo de cuerpo de la peticion

```json
{
  "id": "number",
  "name": "string",
  "start_date": "date",
  "end_date": "date",
  "completed": "boolean"
}
```

### Respuesta

```json
{ "status": 201, "message": "Success", "data": "Created Goal" }
```

## PUT:

- `/api/goals/:id`

### Ejemplo de cuerpo de la peticion

```json
{
  "name": "string",
  "start_date": "date",
  "end_date": "date",
  "completed": "boolean"
}
```

### Respuesta

```json
{ "status": 200, "message": "Success", "data": "Updated Goal with ID :id" }
```

## Delete

.

- `api/goals/:id`

### Respuesta

```json
{
  "status": 200,
  "message": "Success",
  "data": "Goal with ID ${id} deleted. Goals remaining: ${goals.length}"
}
```

# Instalacion del proyecto

### Clonar repositorio

```console
git clone https://github.com/rdelavega/GoalsAPI.git
```

### Ir a directorio del proyecto

```console
cd GoalsAPI
```

### Instalar dependencias

```console
npm install
```

### Agregar direccion de archivo json los siguientes archivos:

- `src/controllers/goals.controller.js`
- `src/tests/goals.test.js`

### Correr servidor

```console
npm run dev
```

### Correr tests

```console
npm test
```

# Futuras mejoras

- Persistencia real de datos con `fs`
- Validaciones con middleware
- Testeo con Mocha + Chai
- Dockerización del entorno
- Agregar base de datos real
