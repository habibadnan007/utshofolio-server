import { Schema, model } from 'mongoose'
import { TExperience } from './experience.interface'

// Experience Schema definition
const ExperienceSchema = new Schema<TExperience>(
  {
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
    },
    timePeriod: {
      type: String,
      required: [true, 'Time Period is required'],
    },
    jobType: {
      type: String,
      enum: ['Remote', 'On Site', 'Hybrid'],
      required: [true, 'Job type is required'],
    },
    location: {
      type: String, // Optional: location of the job
    },
    description: {
      type: String, // Optional: job description
    },
    position: {
      type: Number,
      default: 0,
    },
    isCourse: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

// Experience model export
const Experience = model<TExperience>('Experience', ExperienceSchema)
export default Experience
