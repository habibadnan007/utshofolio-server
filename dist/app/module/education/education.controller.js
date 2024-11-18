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
exports.educationController = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const appError_1 = __importDefault(require("../../errors/appError"));
const education_service_1 = require("./education.service"); // Import the correct education services
// Insert a new education record
const insertEducation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const education = yield education_service_1.educationServices.insertEducation(req.body); // Directly use req.body
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.CREATED, {
        success: true,
        message: 'Education inserted successfully!',
        data: education,
    });
}));
// Get all education records
const getAllEducations = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { data, total } = yield education_service_1.educationServices.getAllEducations(req.query); // Ensure this calls the correct service
    const page = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) ? Number(req.query.page) : 1;
    const limit = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) ? Number(req.query.limit) : 10;
    const totalPage = Math.ceil(total / limit);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Educations retrieved successfully!',
        data,
        meta: { total, page, totalPage, limit },
    });
}));
// Get a single education record by ID
const getEducationById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const education = yield education_service_1.educationServices.getEducationById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (!education) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Education not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Education retrieved successfully!',
        data: education,
    });
}));
// Update a single education record by ID
const updateEducationById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const education = yield education_service_1.educationServices.updateEducationById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id, req.body);
    if (!education) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Education not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Education updated successfully!',
        data: education,
    });
}));
// Delete a single education record by ID
const deleteEducationById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const education = yield education_service_1.educationServices.deleteEducationById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (!education) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Education not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Education deleted successfully!',
        data: education,
    });
}));
exports.educationController = {
    insertEducation,
    getAllEducations,
    getEducationById,
    updateEducationById,
    deleteEducationById,
};
