"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workingDate_controller_1 = require("../controllers/workingDate.controller");
const router = (0, express_1.Router)();
router.get("/working-date", workingDate_controller_1.calculateWorkingDate);
exports.default = router;
