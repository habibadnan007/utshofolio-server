import { RequestHandler } from 'express'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import AppError from '../../errors/appError'
import { technologyServices } from './technology.service' // Update the import to use technology services

// Insert a new technology record
const insertTechnology: RequestHandler = catchAsync(async (req, res) => {
  const technology = await technologyServices.insertTechnology(req.body) // Directly use req.body

  sendResponse(res, StatusCodes.CREATED, {
    success: true,
    message: 'Technology inserted successfully!',
    data: technology,
  })
})

// Get all technology records
const getAllTechnologies: RequestHandler = catchAsync(async (req, res) => {
  const { data, total } = await technologyServices.getAllTechnologies(req.query) // Ensure this calls the correct service

  const page = req.query?.page ? Number(req.query.page) : 1
  const limit = req.query?.limit ? Number(req.query.limit) : 10
  const totalPage = Math.ceil(total / limit)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Technologies retrieved successfully!',
    data,
    meta: { total, page, totalPage, limit },
  })
})

// Get a single technology record by ID
const getTechnologyById: RequestHandler = catchAsync(async (req, res) => {
  const technology = await technologyServices.getTechnologyById(req.params?.id)
  if (!technology) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Technology not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Technology retrieved successfully!',
    data: technology,
  })
})

// Update a single technology record by ID
const updateTechnologyById: RequestHandler = catchAsync(async (req, res) => {
  const technology = await technologyServices.updateTechnologyById(
    req.params?.id,
    req.body, // Directly use req.body
  )
  if (!technology) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Technology not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Technology updated successfully!',
    data: technology,
  })
})

// Delete a single technology record by ID
const deleteTechnologyById: RequestHandler = catchAsync(async (req, res) => {
  const technology = await technologyServices.deleteTechnologyById(
    req.params?.id,
  )
  if (!technology) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Technology not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Technology deleted successfully!',
    data: technology,
  })
})

export const technologyController = {
  insertTechnology,
  getAllTechnologies,
  getTechnologyById,
  updateTechnologyById,
  deleteTechnologyById,
}
