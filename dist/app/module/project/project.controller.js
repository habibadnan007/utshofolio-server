"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectController = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const appError_1 = __importDefault(require("../../errors/appError"));
const project_service_1 = require("./project.service");
// Insert a new project
const insertProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_service_1.projectServices.insertProject(req.files.logo[0], req.files.banner[0], req.body);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.CREATED, {
        success: true,
        message: 'Project inserted successfully!',
        data: project,
    });
}));
// Get all projects
const getAllProjects = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { data, total } = yield project_service_1.projectServices.getAllProjects(req.query); // Ensure this calls the correct service
    const page = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) ? Number(req.query.page) : 1;
    const limit = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) ? Number(req.query.limit) : 10;
    const totalPage = Math.ceil(total / limit);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Projects retrieved successfully!',
        data,
        meta: { total, page, totalPage, limit },
    });
}));
// Get a single project by ID
const getProjectById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const project = yield project_service_1.projectServices.getProjectById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (!project) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Project not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Project retrieved successfully!',
        data: project,
    });
}));
// Update a single project by ID
const updateProjectById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    const project = yield project_service_1.projectServices.updateProjectById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id, (_d = (_c = (_b = req.files) === null || _b === void 0 ? void 0 : _b.logo) === null || _c === void 0 ? void 0 : _c[0]) !== null && _d !== void 0 ? _d : null, (_g = (_f = (_e = req.files) === null || _e === void 0 ? void 0 : _e.banner) === null || _f === void 0 ? void 0 : _f[0]) !== null && _g !== void 0 ? _g : null, req.body);
    if (!project) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Project not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Project updated successfully!',
        data: project,
    });
}));
// Delete a single project by ID
const deleteProjectById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const project = yield project_service_1.projectServices.deleteProjectById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (!project) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Project not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Project deleted successfully!',
        data: project,
    });
}));
exports.projectController = {
    insertProject,
    getAllProjects,
    getProjectById,
    updateProjectById,
    deleteProjectById,
};
