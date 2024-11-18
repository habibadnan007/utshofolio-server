import { z } from 'zod'

// Project creation schema
const createProjectZodSchema = z.object({
  title: z.string({ required_error: 'Title is required' }),
  description: z.string({ required_error: 'Description is required' }),
  category: z.enum(['Full Stack', 'Frontend', 'Backend'], {
    required_error: 'Category is required',
  }),
  technologies: z.array(z.string(), {
    required_error: 'Technologies are required',
  }),
  demoUrl: z.string().optional(),
  githubUrl: z
    .object({
      frontend: z.string().optional(),
      backend: z.string().optional(),
    })
    .optional(),
  position: z.number().optional(),
  isFeatured: z
    .boolean({ required_error: 'Is Featured is required' })
    .default(false),
  tags: z.array(z.string()).optional(),
  status: z.enum(['In Progress', 'Completed'], {
    required_error: 'Status is required',
  }),
  role: z.enum(
    ['Full Stack Developer', 'Frontend Developer', 'Backend Developer'],
    { required_error: 'Role is required' },
  ),
  isDeleted: z
    .boolean({ required_error: 'Is Deleted is required' })
    .default(false),
})

// Project update schema
const updateProjectZodSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  category: z.enum(['Full Stack', 'Frontend', 'Backend']).optional(),
  technologies: z.array(z.string()).optional(),
  demoUrl: z.string().optional(),
  githubUrl: z
    .object({
      frontend: z.string().optional(),
      backend: z.string().optional(),
    })
    .optional(),
  position: z.number().optional(),
  isFeatured: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['In Progress', 'Completed']).optional(),
  role: z
    .enum(['Full Stack Developer', 'Frontend Developer', 'Backend Developer'])
    .optional(),
  isDeleted: z.boolean().optional(),
})

export { createProjectZodSchema, updateProjectZodSchema }
