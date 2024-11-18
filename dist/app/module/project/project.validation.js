"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectZodSchema = exports.createProjectZodSchema = void 0;
const zod_1 = require("zod");
// Project creation schema
const createProjectZodSchema = zod_1.z.object({
    title: zod_1.z.string({ required_error: 'Title is required' }),
    description: zod_1.z.string({ required_error: 'Description is required' }),
    category: zod_1.z.enum(['Full Stack', 'Frontend', 'Backend'], {
        required_error: 'Category is required',
    }),
    technologies: zod_1.z.array(zod_1.z.string(), {
        required_error: 'Technologies are required',
    }),
    demoUrl: zod_1.z.string().optional(),
    githubUrl: zod_1.z
        .object({
        frontend: zod_1.z.string().optional(),
        backend: zod_1.z.string().optional(),
    })
        .optional(),
    position: zod_1.z.number().optional(),
    isFeatured: zod_1.z
        .boolean({ required_error: 'Is Featured is required' })
        .default(false),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    status: zod_1.z.enum(['In Progress', 'Completed'], {
        required_error: 'Status is required',
    }),
    role: zod_1.z.enum(['Full Stack Developer', 'Frontend Developer', 'Backend Developer'], { required_error: 'Role is required' }),
    isDeleted: zod_1.z
        .boolean({ required_error: 'Is Deleted is required' })
        .default(false),
});
exports.createProjectZodSchema = createProjectZodSchema;
// Project update schema
const updateProjectZodSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    category: zod_1.z.enum(['Full Stack', 'Frontend', 'Backend']).optional(),
    technologies: zod_1.z.array(zod_1.z.string()).optional(),
    demoUrl: zod_1.z.string().optional(),
    githubUrl: zod_1.z
        .object({
        frontend: zod_1.z.string().optional(),
        backend: zod_1.z.string().optional(),
    })
        .optional(),
    position: zod_1.z.number().optional(),
    isFeatured: zod_1.z.boolean().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    status: zod_1.z.enum(['In Progress', 'Completed']).optional(),
    role: zod_1.z
        .enum(['Full Stack Developer', 'Frontend Developer', 'Backend Developer'])
        .optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.updateProjectZodSchema = updateProjectZodSchema;
