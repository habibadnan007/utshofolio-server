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
exports.projectServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../errors/appError"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const uploadImgToCloudinary_1 = require("../../utils/uploadImgToCloudinary");
const mongoose_1 = __importDefault(require("mongoose"));
const Project_model_1 = __importDefault(require("./Project.model"));
const project_constant_1 = require("./project.constant");
// Function to insert a new project
const insertProject = (logoFile, bannerFile, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // File upload for logo
        if (logoFile === null || logoFile === void 0 ? void 0 : logoFile.path) {
            const cloudinaryResLogo = yield (0, uploadImgToCloudinary_1.uploadImgToCloudinary)(`utshofolio-${Date.now()}`, logoFile.path);
            if (cloudinaryResLogo === null || cloudinaryResLogo === void 0 ? void 0 : cloudinaryResLogo.secure_url) {
                payload.logo = cloudinaryResLogo.secure_url; // Assuming you have a logo field in TProject
            }
        }
        // File upload for banner
        if (bannerFile === null || bannerFile === void 0 ? void 0 : bannerFile.path) {
            const cloudinaryResBanner = yield (0, uploadImgToCloudinary_1.uploadImgToCloudinary)(`utshofolio-${Date.now()}`, bannerFile.path);
            if (cloudinaryResBanner === null || cloudinaryResBanner === void 0 ? void 0 : cloudinaryResBanner.secure_url) {
                payload.banner = cloudinaryResBanner.secure_url; // Assuming you have a banner field in TProject
            }
        }
        const project = yield Project_model_1.default.create([payload], { session });
        yield session.commitTransaction();
        yield session.endSession();
        return project[0];
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new appError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
});
// Function to get all projects
const getAllProjects = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const projectQuery = new QueryBuilder_1.default(Project_model_1.default.find(), Object.assign(Object.assign({}, query), { sort: `${query.sort} -createdAt` }))
        .searchQuery(project_constant_1.projectSearchableField)
        .filterQuery()
        .sortQuery()
        .paginateQuery()
        .fieldFilteringQuery()
        .populateQuery([]);
    const result = yield (projectQuery === null || projectQuery === void 0 ? void 0 : projectQuery.queryModel);
    const total = yield Project_model_1.default.countDocuments(projectQuery.queryModel.getFilter());
    return { data: result, total };
});
// Function to get a project by ID
const getProjectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield Project_model_1.default.findById(id).select('-__v');
    if (!project) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Project not found!');
    }
    return project;
});
// Function to update a project by ID
const updateProjectById = (id, logoFile, bannerFile, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existProject = yield Project_model_1.default.findById(id);
    if (!existProject) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Project not found!');
    }
    // File upload for logo
    if (logoFile === null || logoFile === void 0 ? void 0 : logoFile.path) {
        const cloudinaryResLogo = yield (0, uploadImgToCloudinary_1.uploadImgToCloudinary)(`project-logo-${Date.now()}`, logoFile.path);
        if (cloudinaryResLogo === null || cloudinaryResLogo === void 0 ? void 0 : cloudinaryResLogo.secure_url) {
            payload.logo = cloudinaryResLogo.secure_url; // Assuming you have a logo field in TProject
        }
    }
    // File upload for banner
    if (bannerFile === null || bannerFile === void 0 ? void 0 : bannerFile.path) {
        const cloudinaryResBanner = yield (0, uploadImgToCloudinary_1.uploadImgToCloudinary)(`project-banner-${Date.now()}`, bannerFile.path);
        if (cloudinaryResBanner === null || cloudinaryResBanner === void 0 ? void 0 : cloudinaryResBanner.secure_url) {
            payload.banner = cloudinaryResBanner.secure_url; // Assuming you have a banner field in TProject
        }
    }
    const project = yield Project_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    if (!project) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Project not found!');
    }
    return project;
});
// Function to delete a project by ID
const deleteProjectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existProject = yield Project_model_1.default.findById(id);
    if (!existProject) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Project not found!');
    }
    const project = yield Project_model_1.default.findByIdAndDelete(id);
    if (!project) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Project not found!');
    }
    return project;
});
// Exporting the project services
exports.projectServices = {
    insertProject,
    getAllProjects,
    getProjectById,
    updateProjectById,
    deleteProjectById,
};
