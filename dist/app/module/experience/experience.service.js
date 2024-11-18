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
exports.experienceServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../errors/appError"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const experience_model_1 = __importDefault(require("./experience.model")); // Import the Experience model
const experience_constant_1 = require("./experience.constant");
// Function to insert a new experience
const insertExperience = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield experience_model_1.default.create(payload);
    return res;
});
// Function to get all experiences
const getAllExperiences = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const experienceQuery = new QueryBuilder_1.default(experience_model_1.default.find(), Object.assign(Object.assign({}, query), { sort: `${query.sort} -createdAt` }))
        .searchQuery(experience_constant_1.experienceSearchableField)
        .filterQuery()
        .sortQuery()
        .paginateQuery()
        .fieldFilteringQuery()
        .populateQuery([]);
    const result = yield (experienceQuery === null || experienceQuery === void 0 ? void 0 : experienceQuery.queryModel);
    const total = yield experience_model_1.default.countDocuments(experienceQuery.queryModel.getFilter());
    return { data: result, total };
});
// Function to get an experience by ID
const getExperienceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const experience = yield experience_model_1.default.findById(id).select('-__v');
    if (!experience) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Experience not found!');
    }
    return experience;
});
// Function to update an experience by ID
const updateExperienceById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existExperience = yield experience_model_1.default.findById(id);
    if (!existExperience) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Experience not found!');
    }
    const experience = yield experience_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    });
    if (!experience) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Experience not found!');
    }
    return experience;
});
// Function to delete an experience by ID
const deleteExperienceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const experience = yield experience_model_1.default.findByIdAndDelete(id);
    if (!experience) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Experience not found!');
    }
    return experience;
});
// Exporting the experience services
exports.experienceServices = {
    insertExperience,
    getAllExperiences,
    getExperienceById,
    updateExperienceById,
    deleteExperienceById,
};
