import { Schema, model } from 'mongoose'
import { TTechnology } from './technology.interface' // Adjust import path if necessary

// Technology Schema definition
const TechnologySchema = new Schema<TTechnology>(
  {
    name: {
      type: String,
      required: [true, 'Technology name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Full Stack', 'Tools'], // Enum values from TechnologyCategory
      required: [true, 'Category is required'],
    },
    isFeatured: {
      type: Boolean,
      default: false,
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

// Technology model export
const Technology = model<TTechnology>('Technology', TechnologySchema)
export default Technology
