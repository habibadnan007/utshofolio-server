"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const project_controller_1 = require("./project.controller");
const express_1 = require("express");
const uploadImgToCloudinary_1 = require("../../utils/uploadImgToCloudinary");
const project_validation_1 = require("./project.validation");
const router = (0, express_1.Router)();
exports.projectRouter = router;
// Create a new project
router.post('/', uploadImgToCloudinary_1.upload.fields([{ name: 'logo' }, { name: 'banner' }]), // Adjusting for multiple file uploads
(req, res, next) => {
    var _a;
    req.body = JSON.parse((_a = req.body) === null || _a === void 0 ? void 0 : _a.data);
    next();
}, (0, zodValidateHandler_1.default)(project_validation_1.createProjectZodSchema), project_controller_1.projectController.insertProject);
// Get all projects
router.get('/', project_controller_1.projectController.getAllProjects);
// Get a single project by ID
router.get('/:id', project_controller_1.projectController.getProjectById);
// Update a project by ID
router.patch('/:id', uploadImgToCloudinary_1.upload.fields([{ name: 'logo' }, { name: 'banner' }]), // Adjusting for multiple file uploads
(req, res, next) => {
    var _a;
    req.body = JSON.parse((_a = req.body) === null || _a === void 0 ? void 0 : _a.data);
    next();
}, (0, zodValidateHandler_1.default)(project_validation_1.updateProjectZodSchema), project_controller_1.projectController.updateProjectById);
// Delete a project by ID
router.delete('/:id', project_controller_1.projectController.deleteProjectById);
