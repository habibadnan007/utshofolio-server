import { RequestHandler } from 'express'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import AppError from '../../errors/appError'
import { experienceServices } from './experience.service' // Ensure this imports the correct experience services

// Insert a new experience
const insertExperience: RequestHandler = catchAsync(async (req, res) => {
  const experience = await experienceServices.insertExperience(req.body) // Directly use req.body

  sendResponse(res, StatusCodes.CREATED, {
    success: true,
    message: 'Experience inserted successfully!',
    data: experience,
  })
})

// Get all experiences
const getAllExperiences: RequestHandler = catchAsync(async (req, res) => {
  const { data, total } = await experienceServices.getAllExperiences(req.query) // Ensure this calls the correct service

  const page = req.query?.page ? Number(req.query.page) : 1
  const limit = req.query?.limit ? Number(req.query.limit) : 10
  const totalPage = Math.ceil(total / limit)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Experiences retrieved successfully!',
    data,
    meta: { total, page, totalPage, limit },
  })
})

// Get a single experience by ID
const getExperienceById: RequestHandler = catchAsync(async (req, res) => {
  const experience = await experienceServices.getExperienceById(req.params?.id)
  if (!experience) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Experience not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Experience retrieved successfully!',
    data: experience,
  })
})

// Update a single experience by ID
const updateExperienceById: RequestHandler = catchAsync(async (req, res) => {
  const experience = await experienceServices.updateExperienceById(
    req.params?.id,
    req.body, // Directly use req.body
  )
  if (!experience) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Experience not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Experience updated successfully!',
    data: experience,
  })
})

// Delete a single experience by ID
const deleteExperienceById: RequestHandler = catchAsync(async (req, res) => {
  const experience = await experienceServices.deleteExperienceById(
    req.params?.id,
  )
  if (!experience) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Experience not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Experience deleted successfully!',
    data: experience,
  })
})

export const experienceController = {
  insertExperience,
  getAllExperiences,
  getExperienceById,
  updateExperienceById,
  deleteExperienceById,
}
