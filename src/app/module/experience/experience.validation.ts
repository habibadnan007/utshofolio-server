import { z } from 'zod'

// Experience creation schema
const createExperienceZodSchema = z.object({
  companyName: z.string({ required_error: 'Company name is required' }).trim(),
  role: z.string({ required_error: 'Role is required' }).trim(),
  timePeriod: z.string({ required_error: 'Time Period is required' }).trim(),
  jobType: z.enum(['Remote', 'On Site', 'Hybrid'], {
    required_error: 'Job type is required',
  }),
  location: z.string().optional(),
  description: z.string().optional(),
  isCourse: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
})

// Experience update schema
const updateExperienceZodSchema = z.object({
  companyName: z.string().optional(),
  role: z.string().optional(),
  timePeriod: z.string().optional(),
  jobType: z.enum(['Remote', 'On Site', 'Hybrid']).optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  isCourse: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
})

export { createExperienceZodSchema, updateExperienceZodSchema }
