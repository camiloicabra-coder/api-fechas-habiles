import { Request, Response } from "express";
import { getWorkingDate } from "../services/workingDate.service";

export const calculateWorkingDate = (req: Request, res: Response) => {
  try {
    const { days, hours, date } = req.query;

    // Validación de parámetros obligatorios
    if (!days && !hours) {
      return res.status(400).json({
        error: "InvalidParameters",
        message: "Debe enviar al menos uno de los parámetros: days o hours",
      });
    }

    // Validar formato de 'date' solo si se envía
    if (date) {
      const parsedDate = new Date(date as string);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({
          error: "InvalidParameters",
          message: "El parámetro 'date' debe estar en formato ISO 8601 (UTC) ejemplo 2025-10-19",
        });
      }
    }

    // Si no se envía date, tomamos la fecha actual
    const baseDate = date ? (date as string) : new Date().toISOString();

    // Calcular fecha hábil
    const result = getWorkingDate({
      days: days ? parseInt(days as string, 10) : 0,
      hours: hours ? parseInt(hours as string, 10) : 0,
      date: baseDate,
    });

    // Respuesta exitosa
    return res.status(200).json({ date: result });
  } catch (err) {
    console.error("Error interno:", err);

    // Ejemplo: si la dependencia externa falla
    if (String(err).includes("ServiceUnavailable")) {
      return res.status(503).json({
        error: "ServiceUnavailable",
        message: "El servicio no está disponible en este momento. Intente más tarde.",
      });
    }

    return res.status(500).json({
      error: "InternalServerError",
      message: "Ocurrió un error inesperado en el servidor",
    });
  }
};
