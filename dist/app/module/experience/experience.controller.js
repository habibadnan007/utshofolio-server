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
exports.experienceController = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const appError_1 = __importDefault(require("../../errors/appError"));
const experience_service_1 = require("./experience.service"); // Ensure this imports the correct experience services
// Insert a new experience
const insertExperience = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const experience = yield experience_service_1.experienceServices.insertExperience(req.body); // Directly use req.body
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.CREATED, {
        success: true,
        message: 'Experience inserted successfully!',
        data: experience,
    });
}));
// Get all experiences
const getAllExperiences = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { data, total } = yield experience_service_1.experienceServices.getAllExperiences(req.query); // Ensure this calls the correct service
    const page = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) ? Number(req.query.page) : 1;
    const limit = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) ? Number(req.query.limit) : 10;
    const totalPage = Math.ceil(total / limit);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Experiences retrieved successfully!',
        data,
        meta: { total, page, totalPage, limit },
    });
}));
// Get a single experience by ID
const getExperienceById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const experience = yield experience_service_1.experienceServices.getExperienceById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (!experience) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Experience not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Experience retrieved successfully!',
        data: experience,
    });
}));
// Update a single experience by ID
const updateExperienceById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const experience = yield experience_service_1.experienceServices.updateExperienceById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id, req.body);
    if (!experience) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Experience not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Experience updated successfully!',
        data: experience,
    });
}));
// Delete a single experience by ID
const deleteExperienceById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const experience = yield experience_service_1.experienceServices.deleteExperienceById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (!experience) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Experience not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Experience deleted successfully!',
        data: experience,
    });
}));
exports.experienceController = {
    insertExperience,
    getAllExperiences,
    getExperienceById,
    updateExperienceById,
    deleteExperienceById,
};
