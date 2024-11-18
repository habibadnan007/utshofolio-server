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
exports.educationServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../errors/appError"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const education_model_1 = __importDefault(require("./education.model")); // Import the Education model
const education_constant_1 = require("./education.constant");
// Function to insert a new education record
const insertEducation = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield education_model_1.default.create(payload);
    return res;
});
// Function to get all education records
const getAllEducations = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const educationQuery = new QueryBuilder_1.default(education_model_1.default.find(), Object.assign(Object.assign({}, query), { sort: `${query.sort} -createdAt` }))
        .searchQuery(education_constant_1.educationSearchableField)
        .filterQuery()
        .sortQuery()
        .paginateQuery()
        .fieldFilteringQuery()
        .populateQuery([]);
    const result = yield (educationQuery === null || educationQuery === void 0 ? void 0 : educationQuery.queryModel);
    const total = yield education_model_1.default.countDocuments(educationQuery.queryModel.getFilter());
    return { data: result, total };
});
// Function to get an education record by ID
const getEducationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const education = yield education_model_1.default.findById(id).select('-__v');
    if (!education) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Education not found!');
    }
    return education;
});
// Function to update an education record by ID
const updateEducationById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existEducation = yield education_model_1.default.findById(id);
    if (!existEducation) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Education not found!');
    }
    const education = yield education_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    });
    if (!education) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Education not found!');
    }
    return education;
});
// Function to delete an education record by ID
const deleteEducationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const education = yield education_model_1.default.findByIdAndDelete(id);
    if (!education) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Education not found!');
    }
    return education;
});
// Exporting the education services
exports.educationServices = {
    insertEducation,
    getAllEducations,
    getEducationById,
    updateEducationById,
    deleteEducationById,
};
