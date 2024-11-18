"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTechnologyZodSchema = exports.createTechnologyZodSchema = void 0;
const zod_1 = require("zod");
// Technology creation schema
const createTechnologyZodSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Technology name is required' }).trim(),
    category: zod_1.z.enum(['Frontend', 'Backend', 'Full Stack', 'Tools'], {
        required_error: 'Category is required',
    }),
    isFeatured: zod_1.z.boolean().default(false),
    isDeleted: zod_1.z.boolean().default(false),
});
exports.createTechnologyZodSchema = createTechnologyZodSchema;
// Technology update schema
const updateTechnologyZodSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    category: zod_1.z.enum(['Frontend', 'Backend', 'Full Stack', 'Tools']).optional(),
    isFeatured: zod_1.z.boolean().optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.updateTechnologyZodSchema = updateTechnologyZodSchema;
