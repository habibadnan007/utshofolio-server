"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.educationRouter = void 0;
const express_1 = require("express");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const education_controller_1 = require("./education.controller"); // Import the correct education controller
const education_validation_1 = require("./education.validation");
const router = (0, express_1.Router)();
exports.educationRouter = router;
// Create a new education record
router.post('/', (0, zodValidateHandler_1.default)(education_validation_1.createEducationZodSchema), // Adjusting the schema validation
education_controller_1.educationController.insertEducation);
// Get all education records
router.get('/', education_controller_1.educationController.getAllEducations);
// Get a single education record by ID
router.get('/:id', education_controller_1.educationController.getEducationById);
// Update an education record by ID
router.patch('/:id', (0, zodValidateHandler_1.default)(education_validation_1.updateEducationZodSchema), // Adjusting the schema validation
education_controller_1.educationController.updateEducationById);
// Delete an education record by ID
router.delete('/:id', education_controller_1.educationController.deleteEducationById);
