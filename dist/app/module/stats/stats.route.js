"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statsRouter = void 0;
const express_1 = require("express");
const stats_controller_1 = require("./stats.controller");
const router = (0, express_1.Router)();
exports.statsRouter = router;
router.get('/', stats_controller_1.statsControllers.getDashboardStats);
