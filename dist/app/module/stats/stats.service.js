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
exports.statsService = void 0;
const Project_model_1 = __importDefault(require("../project/Project.model"));
const experience_model_1 = __importDefault(require("../experience/experience.model"));
const education_model_1 = __importDefault(require("../education/education.model"));
const getDashboardStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalProject = yield Project_model_1.default.countDocuments();
    const totalFeaturedProject = yield Project_model_1.default.find({
        isFeatured: true,
    }).countDocuments();
    const totalExperience = yield experience_model_1.default.find({
        isCourse: false,
    }).countDocuments();
    const totalCourse = yield experience_model_1.default.find({
        isCourse: true,
    }).countDocuments();
    const totalEducation = yield education_model_1.default.countDocuments();
    return {
        totalProject,
        totalFeaturedProject,
        totalExperience,
        totalCourse,
        totalEducation,
    };
});
exports.statsService = {
    getDashboardStats,
};
