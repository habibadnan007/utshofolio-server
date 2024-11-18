"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.experienceRouter = void 0;
const express_1 = require("express");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const experience_controller_1 = require("./experience.controller"); // Ensure this imports the correct experience controller
const experience_validation_1 = require("./experience.validation");
const router = (0, express_1.Router)();
exports.experienceRouter = router;
// Create a new experience
router.post('/', (0, zodValidateHandler_1.default)(experience_validation_1.createExperienceZodSchema), // Adjusting the schema validation
experience_controller_1.experienceController.insertExperience);
// Get all experiences
router.get('/', experience_controller_1.experienceController.getAllExperiences);
// Get a single experience by ID
router.get('/:id', experience_controller_1.experienceController.getExperienceById);
// Update an experience by ID
router.patch('/:id', (0, zodValidateHandler_1.default)(experience_validation_1.updateExperienceZodSchema), // Adjusting the schema validation
experience_controller_1.experienceController.updateExperienceById);
// Delete an experience by ID
router.delete('/:id', experience_controller_1.experienceController.deleteExperienceById);
