"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.technologyRouter = void 0;
const express_1 = require("express");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const technology_controller_1 = require("./technology.controller"); // Import the correct technology controller
const technology_validation_1 = require("./technology.validation");
const router = (0, express_1.Router)();
exports.technologyRouter = router;
// Create a new technology record
router.post('/', (0, zodValidateHandler_1.default)(technology_validation_1.createTechnologyZodSchema), // Adjusting the schema validation
technology_controller_1.technologyController.insertTechnology);
// Get all technology records
router.get('/', technology_controller_1.technologyController.getAllTechnologies);
// Get a single technology record by ID
router.get('/:id', technology_controller_1.technologyController.getTechnologyById);
// Update a technology record by ID
router.patch('/:id', (0, zodValidateHandler_1.default)(technology_validation_1.updateTechnologyZodSchema), // Adjusting the schema validation
technology_controller_1.technologyController.updateTechnologyById);
// Delete a technology record by ID
router.delete('/:id', technology_controller_1.technologyController.deleteTechnologyById);
