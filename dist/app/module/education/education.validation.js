"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEducationZodSchema = exports.createEducationZodSchema = void 0;
const zod_1 = require("zod");
// Education creation schema
const createEducationZodSchema = zod_1.z.object({
    instituteName: zod_1.z
        .string({ required_error: 'Institute name is required' })
        .trim(),
    department: zod_1.z.string({ required_error: 'Department is required' }).trim(),
    timePeriod: zod_1.z.string({ required_error: 'Time Period is required' }).trim(),
    location: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().default(false),
});
exports.createEducationZodSchema = createEducationZodSchema;
// Education update schema
const updateEducationZodSchema = zod_1.z.object({
    instituteName: zod_1.z.string().optional(),
    department: zod_1.z.string().optional(),
    timePeriod: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.updateEducationZodSchema = updateEducationZodSchema;
