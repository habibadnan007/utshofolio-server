import { StatusCodes } from 'http-status-codes'
import { TProject } from './project.interface' // Ensure this imports the correct TProject type
import AppError from '../../errors/appError'
import QueryBuilder from '../../builder/QueryBuilder'
import { uploadImgToCloudinary } from '../../utils/uploadImgToCloudinary'
import mongoose from 'mongoose'
import Project from './Project.model'
import { projectSearchableField } from './project.constant'

// Function to insert a new project
const insertProject = async (
  logoFile: Express.Multer.File,
  bannerFile: Express.Multer.File,
  payload: TProject,
) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // File upload for logo
    if (logoFile?.path) {
      const cloudinaryResLogo = await uploadImgToCloudinary(
        `utshofolio-${Date.now()}`,
        logoFile.path,
      )
      if (cloudinaryResLogo?.secure_url) {
        payload.logo = cloudinaryResLogo.secure_url // Assuming you have a logo field in TProject
      }
    }

    // File upload for banner
    if (bannerFile?.path) {
      const cloudinaryResBanner = await uploadImgToCloudinary(
        `utshofolio-${Date.now()}`,
        bannerFile.path,
      )
      if (cloudinaryResBanner?.secure_url) {
        payload.banner = cloudinaryResBanner.secure_url // Assuming you have a banner field in TProject
      }
    }

    const project = await Project.create([payload], { session })

    await session.commitTransaction()
    await session.endSession()
    return project[0]
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, err.message)
  }
}

// Function to get all projects
const getAllProjects = async (query: Record<string, unknown>) => {
  const projectQuery = new QueryBuilder(Project.find(), {
    ...query,
    sort: `${query.sort} -createdAt`,
  })
    .searchQuery(projectSearchableField)
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .fieldFilteringQuery()
    .populateQuery([])

  const result = await projectQuery?.queryModel
  const total = await Project.countDocuments(
    projectQuery.queryModel.getFilter(),
  )
  return { data: result, total }
}

// Function to get a project by ID
const getProjectById = async (id: string) => {
  const project = await Project.findById(id).select('-__v')
  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found!')
  }
  return project
}

// Function to update a project by ID
const updateProjectById = async (
  id: string,
  logoFile: Express.Multer.File,
  bannerFile: Express.Multer.File,
  payload: Partial<TProject>,
) => {
  const existProject = await Project.findById(id)
  if (!existProject) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found!')
  }

  // File upload for logo
  if (logoFile?.path) {
    const cloudinaryResLogo = await uploadImgToCloudinary(
      `project-logo-${Date.now()}`,
      logoFile.path,
    )
    if (cloudinaryResLogo?.secure_url) {
      payload.logo = cloudinaryResLogo.secure_url // Assuming you have a logo field in TProject
    }
  }

  // File upload for banner
  if (bannerFile?.path) {
    const cloudinaryResBanner = await uploadImgToCloudinary(
      `project-banner-${Date.now()}`,
      bannerFile.path,
    )
    if (cloudinaryResBanner?.secure_url) {
      payload.banner = cloudinaryResBanner.secure_url // Assuming you have a banner field in TProject
    }
  }

  const project = await Project.findByIdAndUpdate(id, payload, { new: true })
  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found!')
  }
  return project
}

// Function to delete a project by ID
const deleteProjectById = async (id: string) => {
  const existProject = await Project.findById(id)
  if (!existProject) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found!')
  }

  const project = await Project.findByIdAndDelete(id)
  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found!')
  }
  return project
}

// Exporting the project services
export const projectServices = {
  insertProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
}
