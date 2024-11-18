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
exports.technologyController = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const appError_1 = __importDefault(require("../../errors/appError"));
const technology_service_1 = require("./technology.service"); // Update the import to use technology services
// Insert a new technology record
const insertTechnology = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const technology = yield technology_service_1.technologyServices.insertTechnology(req.body); // Directly use req.body
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.CREATED, {
        success: true,
        message: 'Technology inserted successfully!',
        data: technology,
    });
}));
// Get all technology records
const getAllTechnologies = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { data, total } = yield technology_service_1.technologyServices.getAllTechnologies(req.query); // Ensure this calls the correct service
    const page = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) ? Number(req.query.page) : 1;
    const limit = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) ? Number(req.query.limit) : 10;
    const totalPage = Math.ceil(total / limit);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Technologies retrieved successfully!',
        data,
        meta: { total, page, totalPage, limit },
    });
}));
// Get a single technology record by ID
const getTechnologyById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const technology = yield technology_service_1.technologyServices.getTechnologyById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (!technology) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Technology not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Technology retrieved successfully!',
        data: technology,
    });
}));
// Update a single technology record by ID
const updateTechnologyById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const technology = yield technology_service_1.technologyServices.updateTechnologyById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id, req.body);
    if (!technology) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Technology not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Technology updated successfully!',
        data: technology,
    });
}));
// Delete a single technology record by ID
const deleteTechnologyById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const technology = yield technology_service_1.technologyServices.deleteTechnologyById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (!technology) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Technology not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Technology deleted successfully!',
        data: technology,
    });
}));
exports.technologyController = {
    insertTechnology,
    getAllTechnologies,
    getTechnologyById,
    updateTechnologyById,
    deleteTechnologyById,
};
