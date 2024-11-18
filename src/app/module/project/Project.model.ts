import { Schema, model } from 'mongoose'
import { TProject } from './project.interface'

// Project Schema definition
const ProjectSchema = new Schema<TProject>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    logo: {
      type: String,
      required: [true, 'Logo is required'],
    },
    banner: {
      type: String,
      required: [true, 'Banner is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    category: {
      type: String,
      enum: ['Full Stack', 'Frontend', 'Backend'], // Define categories as enum
      required: [true, 'Category is required'],
    },
    technologies: {
      type: [String], // Array of strings
      required: [true, 'Technologies are required'],
    },
    demoUrl: {
      type: String,
    },
    githubUrl: {
      frontend: {
        type: String,
      },
      backend: {
        type: String,
      },
    },
    position: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
    },
    status: {
      type: String,
      enum: ['In Progress', 'Completed'],
      required: [true, 'Status is required'],
    },
    role: {
      type: String,
      enum: ['Full Stack Developer', 'Frontend Developer', 'Backend Developer'],
      required: [true, 'Role is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

// Post model export
const Project = model<TProject>('project', ProjectSchema)
export default Project
