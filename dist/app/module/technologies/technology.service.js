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
exports.technologyServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../errors/appError"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const technology_model_1 = __importDefault(require("./technology.model"));
const technology_constant_1 = require("./technology.constant");
// Function to insert a new technology record
const insertTechnology = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield technology_model_1.default.create(payload);
    return res;
});
// Function to get all technology records
const getAllTechnologies = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const technologyQuery = new QueryBuilder_1.default(technology_model_1.default.find(), Object.assign(Object.assign({}, query), { sort: `${query.sort} -createdAt` }))
        .searchQuery(technology_constant_1.technologySearchableField)
        .filterQuery()
        .sortQuery()
        .paginateQuery()
        .fieldFilteringQuery()
        .populateQuery([]);
    const result = yield (technologyQuery === null || technologyQuery === void 0 ? void 0 : technologyQuery.queryModel);
    const total = yield technology_model_1.default.countDocuments(technologyQuery.queryModel.getFilter());
    return { data: result, total };
});
// Function to get a technology record by ID
const getTechnologyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const technology = yield technology_model_1.default.findById(id).select('-__v');
    if (!technology) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Technology not found!');
    }
    return technology;
});
// Function to update a technology record by ID
const updateTechnologyById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existTechnology = yield technology_model_1.default.findById(id);
    if (!existTechnology) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Technology not found!');
    }
    const technology = yield technology_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    });
    if (!technology) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Technology not found!');
    }
    return technology;
});
// Function to delete a technology record by ID
const deleteTechnologyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const technology = yield technology_model_1.default.findByIdAndDelete(id);
    if (!technology) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Technology not found!');
    }
    return technology;
});
// Exporting the technology services
exports.technologyServices = {
    insertTechnology,
    getAllTechnologies,
    getTechnologyById,
    updateTechnologyById,
    deleteTechnologyById,
};
