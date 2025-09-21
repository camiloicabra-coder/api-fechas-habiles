#  API de Fechas Hábiles (Colombia)

Este proyecto implementa un servicio para calcular **fechas hábiles en Colombia**, considerando:
- Horario laboral (8:00 a.m. – 5:00 p.m. con 1 hora de almuerzo).
- Fines de semana.
- Festivos colombianos.

Es una prueba técnica desarrollada en **Node.js + TypeScript**.

---

## Instalación manual

# bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/api-fechas-habiles.git
cd api-fechas-habiles

# 2. Instalación dependencias

npm install

---

## Ejecucion 

# bash
ejecutar el comando
npm run dev

la API estara disponible en:
**http://localhost:3000**

----

## Uso del endpoint

GET /working-date?date=<ISODate>&days=<n>&hours=<n>

date → Fecha en UTC
days → Número de días hábiles a sumar
hours → Número de horas hábiles a sumar

#### Ejemplo

GET /working-date?date=2025-09-15T12:30:00.000Z&days=1

Respuesta

{
  "date": "2025-09-16T17:00:00Z"
}

---

###  Manejo de errores
Todos los errores siguen un formato estándar:

#### Ejemplo parametros invalidos json

GET /working-date?date=2025-09-15T12:30:00.000Z

# respuesta json
{
  "error": "InvalidParameters",
  "message": "Debe enviar al menos uno de los parámetros: days o hours"
}

---

## Tests

El proyecto incluye tests automáticos con Jest que validan casos como:

Cálculo en días laborales.
Ajustes en fines de semana.
Respeto por la hora de almuerzo.
Inclusión de festivos colombianos.

## Instalación de dependencias de testing

# Dependencias necesarias para la API

# bash 
npm install axios dayjs

# Dependencias de desarrollo para pruebas
npm install --save-dev jest ts-jest @types/jest

## Ejecución de test 

# bash
npm test

# Ejemplos de test

# 1. Petición un viernes a las 5:00 p.m. con "hours=1"
Resultado esperado: lunes a las 9:00 a.m. (hora Colombia) → "2025-XX-XXT14:00:00Z" (UTC)

GET /working-date?date=2025-09-19T17:00:00.000Z&hours=1

{
  "date": "2025-09-22T14:00:00Z"
}

# 2. Petición un sábado a las 2:00 p.m. con "hours=1"
Resultado esperado: lunes a las 9:00 a.m. (hora Colombia) → "2025-XX-XXT14:00:00Z" (UTC)

GET /working-date?date=2025-09-20T14:00:00.000Z&hours=1

{
  "date": "2025-09-22T14:00:00Z"
}

# 3. Petición con "days=1" y "hours=4" desde un martes a las 3:00 p.m.
Resultado esperado: jueves a las 10:00 a.m. (hora Colombia) → "2025-XX-XXT15:00:00Z" (UTC)

GET /working-date?date=2025-09-16T15:00:00.000Z&days=1&hours=4

{
  "date": "2025-09-18T15:00:00Z"
}

# 4. Petición con "days=1"  desde un domingo a las 6:00 p.m.
Resultado esperado: lunes a las 5:00 p.m. (hora Colombia) → "2025-XX-XXT22:00:00Z" (UTC)

GET /working-date?date=2025-09-21T18:00:00.000Z&days=1

{
  "date": "2025-09-22T22:00:00Z"
}

# 5. Petición con "hours=8"  desde un día laboral a las 8:00 a.m.
Resultado esperado: mismo día a las 5:00 p.m. (hora Colombia) → "2025-XX-XXT22:00:00Z" (UTC)

GET /working-date?date=2025-09-17T08:00:00.000Z&hours=8

{
  "date": "2025-09-17T22:00:00Z"
}

# 6. Petición con "days=1"  desde un día laboral a las 8:00 a.m.
Resultado esperado: siguiente día laboral a las 8:00 a.m. (hora Colombia) → "2025-XX-XXT13:00:00Z" (UTC)

GET /working-date?date=2025-09-17T08:00:00.000Z&days=1

{
  "date": "2025-09-18T13:00:00Z"
}

# 7. Petición con "days=1"  desde un día laboral a las 12:30 p.m.
Resultado esperado: siguiente día laboral a las 12:00 p.m. (hora Colombia) → "2025-XX-XXT17:00:00Z" (UTC)

GET /working-date?date=2025-09-17T12:30:00.000Z&days=1

{
  "date": "2025-09-18T17:00:00Z"
}

# 8. Petición con "hours=3"  desde un día laboral a las 11:30 p.m.
Resultado esperado: mismo día laboral a las 3:30 p.m. (hora Colombia) → 2025-XX-XXT20:30:00Z (UTC)

GET /working-date?date=2025-09-17T11:30:00.000Z&hours=3

{
  "date": "2025-09-17T20:30:00Z"
}

# 9. Petición con "date=2025-04-10T15:00:00.000Z" y "days=5" y "hours=4"  (el 17 y 18 de abril son festivos)
Resultado esperado: 21 de abril a las 3:30 p.m. (hora Colombia) → "2025-04-21T20:00:00.000Z" (UTC)

GET /working-date?date=2025-04-10T15:00:00.000Z&days=5&hours=4

{
  "date": "2025-04-22T15:00:00Z"
}

En este test la salida no se cumple ya que la salida esperada no esta tomando en cuenta las horas que se asignan que son 4.

## Autor

Camilo Ignacio Cabra Menjura

https://github.com/camiloicabra-coder/api-fechas-habiles