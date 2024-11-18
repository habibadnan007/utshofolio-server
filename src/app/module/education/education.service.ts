import { StatusCodes } from 'http-status-codes'
import { TEducation } from './education.interface' // Import the correct TEducation type
import AppError from '../../errors/appError'
import QueryBuilder from '../../builder/QueryBuilder'
import Education from './education.model' // Import the Education model
import { educationSearchableField } from './education.constant'

// Function to insert a new education record
const insertEducation = async (payload: TEducation) => {
  const res = await Education.create(payload)
  return res
}

// Function to get all education records
const getAllEducations = async (query: Record<string, unknown>) => {
  const educationQuery = new QueryBuilder(Education.find(), {
    ...query,
    sort: `${query.sort} -createdAt`,
  })
    .searchQuery(educationSearchableField)
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .fieldFilteringQuery()
    .populateQuery([])

  const result = await educationQuery?.queryModel
  const total = await Education.countDocuments(
    educationQuery.queryModel.getFilter(),
  )
  return { data: result, total }
}

// Function to get an education record by ID
const getEducationById = async (id: string) => {
  const education = await Education.findById(id).select('-__v')
  if (!education) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Education not found!')
  }
  return education
}

// Function to update an education record by ID
const updateEducationById = async (
  id: string,
  payload: Partial<TEducation>, // Ensure the payload is of type TEducation
) => {
  const existEducation = await Education.findById(id)
  if (!existEducation) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Education not found!')
  }

  const education = await Education.findByIdAndUpdate(id, payload, {
    new: true,
  })
  if (!education) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Education not found!')
  }
  return education
}

// Function to delete an education record by ID
const deleteEducationById = async (id: string) => {
  const education = await Education.findByIdAndDelete(id)
  if (!education) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Education not found!')
  }
  return education
}

// Exporting the education services
export const educationServices = {
  insertEducation,
  getAllEducations,
  getEducationById,
  updateEducationById,
  deleteEducationById,
}
