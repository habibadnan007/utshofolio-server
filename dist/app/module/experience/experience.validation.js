"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExperienceZodSchema = exports.createExperienceZodSchema = void 0;
const zod_1 = require("zod");
// Experience creation schema
const createExperienceZodSchema = zod_1.z.object({
    companyName: zod_1.z.string({ required_error: 'Company name is required' }).trim(),
    role: zod_1.z.string({ required_error: 'Role is required' }).trim(),
    timePeriod: zod_1.z.string({ required_error: 'Time Period is required' }).trim(),
    jobType: zod_1.z.enum(['Remote', 'On Site', 'Hybrid'], {
        required_error: 'Job type is required',
    }),
    location: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    isCourse: zod_1.z.boolean().default(false),
    isDeleted: zod_1.z.boolean().default(false),
});
exports.createExperienceZodSchema = createExperienceZodSchema;
// Experience update schema
const updateExperienceZodSchema = zod_1.z.object({
    companyName: zod_1.z.string().optional(),
    role: zod_1.z.string().optional(),
    timePeriod: zod_1.z.string().optional(),
    jobType: zod_1.z.enum(['Remote', 'On Site', 'Hybrid']).optional(),
    location: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    isCourse: zod_1.z.boolean().optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.updateExperienceZodSchema = updateExperienceZodSchema;
