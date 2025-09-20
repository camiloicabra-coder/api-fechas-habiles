import { Router } from "express";
import { calculateWorkingDate } from "../controllers/workingDate.controller";

const router = Router();

router.get("/working-date", calculateWorkingDate);

export default router;
