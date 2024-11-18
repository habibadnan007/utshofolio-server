import { RequestHandler } from 'express'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import AppError from '../../errors/appError'
import { educationServices } from './education.service' // Import the correct education services

// Insert a new education record
const insertEducation: RequestHandler = catchAsync(async (req, res) => {
  const education = await educationServices.insertEducation(req.body) // Directly use req.body

  sendResponse(res, StatusCodes.CREATED, {
    success: true,
    message: 'Education inserted successfully!',
    data: education,
  })
})

// Get all education records
const getAllEducations: RequestHandler = catchAsync(async (req, res) => {
  const { data, total } = await educationServices.getAllEducations(req.query) // Ensure this calls the correct service

  const page = req.query?.page ? Number(req.query.page) : 1
  const limit = req.query?.limit ? Number(req.query.limit) : 10
  const totalPage = Math.ceil(total / limit)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Educations retrieved successfully!',
    data,
    meta: { total, page, totalPage, limit },
  })
})

// Get a single education record by ID
const getEducationById: RequestHandler = catchAsync(async (req, res) => {
  const education = await educationServices.getEducationById(req.params?.id)
  if (!education) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Education not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Education retrieved successfully!',
    data: education,
  })
})

// Update a single education record by ID
const updateEducationById: RequestHandler = catchAsync(async (req, res) => {
  const education = await educationServices.updateEducationById(
    req.params?.id,
    req.body, // Directly use req.body
  )
  if (!education) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Education not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Education updated successfully!',
    data: education,
  })
})

// Delete a single education record by ID
const deleteEducationById: RequestHandler = catchAsync(async (req, res) => {
  const education = await educationServices.deleteEducationById(req.params?.id)
  if (!education) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Education not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Education deleted successfully!',
    data: education,
  })
})

export const educationController = {
  insertEducation,
  getAllEducations,
  getEducationById,
  updateEducationById,
  deleteEducationById,
}
