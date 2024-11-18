import { z } from 'zod'

// Technology creation schema
const createTechnologyZodSchema = z.object({
  name: z.string({ required_error: 'Technology name is required' }).trim(),
  category: z.enum(['Frontend', 'Backend', 'Full Stack', 'Tools'], {
    required_error: 'Category is required',
  }),
  isFeatured: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
})

// Technology update schema
const updateTechnologyZodSchema = z.object({
  name: z.string().optional(),
  category: z.enum(['Frontend', 'Backend', 'Full Stack', 'Tools']).optional(),
  isFeatured: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
})

export { createTechnologyZodSchema, updateTechnologyZodSchema }
