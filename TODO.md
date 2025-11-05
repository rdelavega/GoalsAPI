# **Semana 2 - TO DO**

### **1 Refactorización y limpieza de la API**

- ✅ Revisar todos los controllers y unificar el estilo de manejo de errores (usar `try/catch` en todos o callbacks de `fs` consistentes).
- [ ] Revisar los nombres de variables y consistencia (ej. `incompleted` → `incomplete`).
- ✅ Asegurarte de que **todas las rutas tengan sendResponse** con estructura consistente `{status, message, data}`.
- ✅ Revisar validaciones de payloads (`req.body`) en **create** y **update**.
- ✅ Revisar que **las rutas literales se declaren antes de las dinámicas** (`/goals/completed` antes de `/goals/:id`).

---

### **2 Persistencia de datos con fs**

- [ ] Consolidar la lectura y escritura del JSON para evitar race conditions (leer, modificar, escribir correctamente).
- [ ] Manejar errores de lectura/escritura de manera uniforme.
- ✅ Revisar que **las operaciones POST no sobreescriban todo**, sino que **pusheen al array y escriban el nuevo array**.
- ✅ Opcional: crear un helper `readJSON` y `writeJSON` para abstraer `fs.readFile` y `fs.writeFile`.

---

### **3 Middleware y validaciones**

- [ ] Crear middleware para **validar payloads de POST y PUT** (evitar ids duplicados o datos incompletos).
- [ ] Crear middleware global de errores si no existe (`errorHandler.js`).
- ✅ Revisar middleware de **CORS** y probar que funciona en Postman y navegador.

---

### **4 Mejora de endpoints**

- [ ] Permitir filtros por query: `/goals?status=completed` para no depender solo de rutas fijas.
- [ ] Revisar respuesta de **updateGoal** y **deleteGoal**: devolver datos actualizados/array final.
- [ ] Revisar consistencia de códigos HTTP (200, 201, 404, 409, 500).

---

### **5 Tests**

- ✅ Escribir tests unitarios con **Mocha + Chai** para cada endpoint:

  - GET `/goals`
  - GET `/goals/:id`
  - POST `/goals`
  - PUT `/goals/:id`
  - DELETE `/goals/:id`
  - Validaciones `/goals/validate/:id` y `/goals/invalidate/:id`

- [ ] Probar **casos límite**: id que no existe, payload vacío, id duplicado, archivo JSON corrupto.

---

### **6 README y documentación**

- [ ] Actualizar README con la nueva estructura y endpoints de query (`?status=`).
- [ ] Incluir ejemplos de payload de POST/PUT y respuestas JSON.
- [ ] Incluir sección de cómo correr tests con `npm test`.

---

### **7 Extra (opcional pero recomendado)**

- ✅ Refactorizar para usar **promesas / async-await** con `fs.promises` en lugar de callbacks.
- ✅ Considerar modularizar helpers de JSON en `/utils/jsonHandler.js`.
- [ ] Revisar performance si el JSON crece (leer/escribir todo el archivo puede ser lento).

---
