import { StatusCodes } from 'http-status-codes'
import { TTechnology } from './technology.interface' // Import the correct TTechnology type
import AppError from '../../errors/appError'
import QueryBuilder from '../../builder/QueryBuilder'
import Technology from './technology.model'
import { technologySearchableField } from './technology.constant'

// Function to insert a new technology record
const insertTechnology = async (payload: TTechnology) => {
  const res = await Technology.create(payload)
  return res
}

// Function to get all technology records
const getAllTechnologies = async (query: Record<string, unknown>) => {
  const technologyQuery = new QueryBuilder(Technology.find(), {
    ...query,
    sort: `${query.sort} -createdAt`,
  })
    .searchQuery(technologySearchableField)
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .fieldFilteringQuery()
    .populateQuery([])

  const result = await technologyQuery?.queryModel
  const total = await Technology.countDocuments(
    technologyQuery.queryModel.getFilter(),
  )
  return { data: result, total }
}

// Function to get a technology record by ID
const getTechnologyById = async (id: string) => {
  const technology = await Technology.findById(id).select('-__v')
  if (!technology) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Technology not found!')
  }
  return technology
}

// Function to update a technology record by ID
const updateTechnologyById = async (
  id: string,
  payload: Partial<TTechnology>, // Ensure the payload is of type TTechnology
) => {
  const existTechnology = await Technology.findById(id)
  if (!existTechnology) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Technology not found!')
  }

  const technology = await Technology.findByIdAndUpdate(id, payload, {
    new: true,
  })
  if (!technology) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Technology not found!')
  }
  return technology
}

// Function to delete a technology record by ID
const deleteTechnologyById = async (id: string) => {
  const technology = await Technology.findByIdAndDelete(id)
  if (!technology) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Technology not found!')
  }
  return technology
}

// Exporting the technology services
export const technologyServices = {
  insertTechnology,
  getAllTechnologies,
  getTechnologyById,
  updateTechnologyById,
  deleteTechnologyById,
}
