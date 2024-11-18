import { z } from 'zod'

// Education creation schema
const createEducationZodSchema = z.object({
  instituteName: z
    .string({ required_error: 'Institute name is required' })
    .trim(),
  department: z.string({ required_error: 'Department is required' }).trim(),
  timePeriod: z.string({ required_error: 'Time Period is required' }).trim(),
  location: z.string().optional(),
  isDeleted: z.boolean().default(false),
})

// Education update schema
const updateEducationZodSchema = z.object({
  instituteName: z.string().optional(),
  department: z.string().optional(),
  timePeriod: z.string().optional(),
  location: z.string().optional(),
  isDeleted: z.boolean().optional(),
})

export { createEducationZodSchema, updateEducationZodSchema }
