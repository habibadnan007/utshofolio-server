import { StatusCodes } from 'http-status-codes'
import { TExperience } from './experience.interface' // Import the correct TExperience type
import AppError from '../../errors/appError'
import QueryBuilder from '../../builder/QueryBuilder'
import Experience from './experience.model' // Import the Experience model
import { experienceSearchableField } from './experience.constant'

// Function to insert a new experience
const insertExperience = async (payload: TExperience) => {
  const res = await Experience.create(payload)
  return res
}

// Function to get all experiences
const getAllExperiences = async (query: Record<string, unknown>) => {
  const experienceQuery = new QueryBuilder(Experience.find(), {
    ...query,
    sort: `${query.sort} -createdAt`,
  })
    .searchQuery(experienceSearchableField)
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .fieldFilteringQuery()
    .populateQuery([])

  const result = await experienceQuery?.queryModel
  const total = await Experience.countDocuments(
    experienceQuery.queryModel.getFilter(),
  )
  return { data: result, total }
}

// Function to get an experience by ID
const getExperienceById = async (id: string) => {
  const experience = await Experience.findById(id).select('-__v')
  if (!experience) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Experience not found!')
  }
  return experience
}

// Function to update an experience by ID
const updateExperienceById = async (
  id: string,
  payload: Partial<TExperience>, // Ensure the payload is of type TExperience
) => {
  const existExperience = await Experience.findById(id)
  if (!existExperience) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Experience not found!')
  }

  const experience = await Experience.findByIdAndUpdate(id, payload, {
    new: true,
  })
  if (!experience) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Experience not found!')
  }
  return experience
}

// Function to delete an experience by ID
const deleteExperienceById = async (id: string) => {
  const experience = await Experience.findByIdAndDelete(id)
  if (!experience) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Experience not found!')
  }
  return experience
}

// Exporting the experience services
export const experienceServices = {
  insertExperience,
  getAllExperiences,
  getExperienceById,
  updateExperienceById,
  deleteExperienceById,
}
