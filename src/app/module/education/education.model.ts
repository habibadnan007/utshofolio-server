import { Schema, model } from 'mongoose'
import { TEducation } from './education.interface' // Adjust import path if necessary

// Education Schema definition
const EducationSchema = new Schema<TEducation>(
  {
    instituteName: {
      type: String,
      required: [true, 'Institute name is required'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
    },
    timePeriod: {
      type: String,
      required: [true, 'Time period is required'],
    },
    location: {
      type: String, // Optional: location of the institute
    },
    position: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

// Education model export
const Education = model<TEducation>('Education', EducationSchema)
export default Education
