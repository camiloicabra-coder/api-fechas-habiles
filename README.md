# 📅 API de Fechas Hábiles (Colombia)

Este proyecto implementa un servicio para calcular **fechas hábiles en Colombia**, considerando:
- Horario laboral (8:00 a.m. – 5:00 p.m. con 1 hora de almuerzo).
- Fines de semana.
- Festivos colombianos.

La API está construida en **Node.js + TypeScript + Express** y desplegada en **Vercel**.

---

## 🚀 Enlace Principal

👉 [API en Producción](https://api-fechas-habiles.vercel.app/)

Mensaje de bienvenida:  
```
https://api-fechas-habiles.vercel.app/
```

Ruta principal de cálculo:  
```
https://api-fechas-habiles.vercel.app/working-date
```

---

## 📌 Requisitos

- Node.js **18+**
- npm (incluido con Node)
- Opcional: [Postman](https://www.postman.com/) para probar las peticiones

---

## ⚙️ Instalación y ejecución local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/camiloicabra-coder/api-fechas-habiles.git
   cd api-fechas-habiles
   ```

2. Instalar dependencias:
   ```bash
   npm install
   npm install axios dayjs
   npm install --save-dev jest ts-jest @types/jest
  
   **Ejecución de test 

   npm test

   ```

3. Compilar el proyecto:
   ```bash
   npm run build
   ```

4. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```

5. Ejecutar en producción local:
   ```bash
   npm start
   ```

6. Probar en navegador o Postman:
   ```
   http://localhost:3000/
   http://localhost:3000/working-date?date=2025-09-15T13:00:00.000Z&hours=8
   ```

---

## 🧪 Escenarios de prueba

Estos son las peticiones probadas directamente en la API desplegada en Vercel:

1. **Viernes 5:00 p.m. + 1 hora → Lunes 9:00 a.m.**  
   👉 [https://api-fechas-habiles.vercel.app/working-date?date=2025-09-19T22:00:00.000Z&hours=1](https://api-fechas-habiles.vercel.app/working-date?date=2025-09-19T22:00:00.000Z&hours=1)

2. **Sábado 2:00 p.m. + 1 hora → Lunes 9:00 a.m.**  
   👉 [https://api-fechas-habiles.vercel.app/working-date?date=2025-09-20T19:00:00.000Z&hours=1](https://api-fechas-habiles.vercel.app/working-date?date=2025-09-20T19:00:00.000Z&hours=1)

3. **Martes 3:00 p.m. + 1 día + 4 horas → Jueves 10:00 a.m.**  
   👉 [https://api-fechas-habiles.vercel.app/working-date?date=2025-09-16T20:00:00.000Z&days=1&hours=4](https://api-fechas-habiles.vercel.app/working-date?date=2025-09-16T20:00:00.000Z&days=1&hours=4)

4. **Domingo 6:00 p.m. + 1 día → Lunes 5:00 p.m.**  
   👉 [https://api-fechas-habiles.vercel.app/working-date?date=2025-09-21T23:00:00.000Z&days=1](https://api-fechas-habiles.vercel.app/working-date?date=2025-09-21T23:00:00.000Z&days=1)

5. **Laboral 8:00 a.m. + 8 horas → 5:00 p.m.**  
   👉 [https://api-fechas-habiles.vercel.app/working-date?date=2025-09-18T13:00:00.000Z&hours=8](https://api-fechas-habiles.vercel.app/working-date?date=2025-09-18T13:00:00.000Z&hours=8)

6. **Laboral 8:00 a.m. + 1 día → siguiente día 8:00 a.m.**  
   👉 [https://api-fechas-habiles.vercel.app/working-date?date=2025-09-18T13:00:00.000Z&days=1](https://api-fechas-habiles.vercel.app/working-date?date=2025-09-18T13:00:00.000Z&days=1)

7. **Laboral 12:30 p.m. + 1 día → siguiente día 12:00 p.m.**  
   👉 [https://api-fechas-habiles.vercel.app/working-date?date=2025-09-18T17:30:00.000Z&days=1](https://api-fechas-habiles.vercel.app/working-date?date=2025-09-18T17:30:00.000Z&days=1)

8. **Laboral 11:30 a.m. + 3 horas → 3:30 p.m.**  
   👉 [https://api-fechas-habiles.vercel.app/working-date?date=2025-09-18T16:30:00.000Z&hours=3](https://api-fechas-habiles.vercel.app/working-date?date=2025-09-18T16:30:00.000Z&hours=3)

9. **Caso con festivos: 10 abril 2025 3:00 p.m. + 5 días + 4 horas**  
   👉 [https://api-fechas-habiles.vercel.app/working-date?date=2025-04-10T20:00:00.000Z&days=5&hours=4](https://api-fechas-habiles.vercel.app/working-date?date=2025-04-10T20:00:00.000Z&days=5&hours=4)

   Para este caso la salida deberia ser 
    "date": "2025-04-22T17:00:00Z" 
    no 
    21 de abril a las 3:30 p.m. (hora Colombia) → "2025-04-21T20:00:00.000Z" (UTC)
    ya que según las reglas de negocio se deben sumar las hora dando como resultado una fecha diferente 


10. **Caso sin `date` (usa fecha actual):**  
    👉 [https://api-fechas-habiles.vercel.app/working-date?days=1](https://api-fechas-habiles.vercel.app/working-date?days=1)

11. **Caso de error (parámetros inválidos):**  
    👉 [https://api-fechas-habiles.vercel.app/working-date?date=fechaInvalida](https://api-fechas-habiles.vercel.app/working-date?date=fechaInvalida)

---

## 🧑‍💻 Scripts disponibles

- `npm run dev` → Ejecuta en modo desarrollo con recarga automática.  
- `npm run build` → Compila TypeScript a JavaScript en carpeta `dist/`.  
- `npm start` → Ejecuta el servidor desde la carpeta compilada.  
- `npm test` → Ejecuta todos los tests con Jest.  
- `npm run test:fechas` → Ejecuta las pruebas unitarias de cálculo de fechas.  

---

## ☁️ Despliegue en Vercel

1. Instalar Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Conectar el proyecto a Vercel:
   ```bash
   vercel
   ```

3. Desplegar en producción:
   ```bash
   vercel --prod
   ```

---

✍️ Autor: **Camilo Ignacio Cabra Menjura**  
📌 Proyecto técnico de fechas hábiles en Colombia
