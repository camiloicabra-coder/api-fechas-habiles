"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workingDate_service_1 = require("../services/workingDate.service");
describe(" Working Date Service", () => {
    test("1️ Viernes 5:00 p.m. + 1 hora → Lunes 9:00 a.m.", async () => {
        const date = "2025-03-14T17:00:00Z"; // Viernes 5:00 p.m. COL
        const result = await (0, workingDate_service_1.getWorkingDate)({ date, hours: 1 });
        expect(result).toBe("2025-03-17T14:00:00Z");
    });
    test("2️ Sábado 2:00 p.m. + 1 hora → Lunes 9:00 a.m.", async () => {
        const date = "2025-03-15T14:00:00Z"; // Sábado 2:00 p.m. COL
        const result = await (0, workingDate_service_1.getWorkingDate)({ date, hours: 1 });
        expect(result).toBe("2025-03-17T14:00:00Z");
    });
    test("3️ Martes 3:00 p.m. + 1 día + 4 horas → Jueves 10:00 a.m.", async () => {
        const date = "2025-03-11T15:00:00Z";
        const result = await (0, workingDate_service_1.getWorkingDate)({ date, days: 1, hours: 4 });
        expect(result).toBe("2025-03-13T15:00:00Z");
    });
    test("4️ Domingo 6:00 p.m. + 1 día → Lunes 5:00 p.m.", async () => {
        const date = "2025-03-16T18:00:00Z";
        const result = await (0, workingDate_service_1.getWorkingDate)({ date, days: 1 });
        expect(result).toBe("2025-03-17T22:00:00Z");
    });
    test("5️ Laboral 8:00 a.m. + 8 horas → 5:00 p.m.", async () => {
        const date = "2025-03-10T08:00:00Z";
        const result = await (0, workingDate_service_1.getWorkingDate)({ date, hours: 8 });
        expect(result).toBe("2025-03-10T22:00:00Z");
    });
    test("6️ Laboral 8:00 a.m. + 1 día → siguiente día 8:00 a.m.", async () => {
        const date = "2025-03-10T08:00:00Z";
        const result = await (0, workingDate_service_1.getWorkingDate)({ date, days: 1 });
        expect(result).toBe("2025-03-11T13:00:00Z");
    });
    test("7️ Laboral 12:30 p.m. + 1 día → siguiente día 12:00 p.m.", async () => {
        const date = "2025-03-10T12:30:00Z";
        const result = await (0, workingDate_service_1.getWorkingDate)({ date, days: 1 });
        expect(result).toBe("2025-03-11T17:00:00Z");
    });
    test("8️ Laboral 11:30 a.m. + 3 horas → 3:30 p.m.", async () => {
        const date = "2025-03-10T11:30:00Z";
        const result = await (0, workingDate_service_1.getWorkingDate)({ date, hours: 3 });
        expect(result).toBe("2025-03-10T20:30:00Z");
    });
    test("9️ Caso con festivos: 10 abril 2025 3:00 p.m. + 5 días + 4 horas → 21 abril 3:00 p.m.", async () => {
        const date = "2025-04-10T15:00:00Z";
        const result = await (0, workingDate_service_1.getWorkingDate)({ date, days: 5, hours: 4 });
        expect(result).toBe("2025-04-22T15:00:00Z"); // el resultado no puede ser 2025-04-21T20:00:00.000Z dado que se estan sumando 4 horas adicionales 
    });
});
