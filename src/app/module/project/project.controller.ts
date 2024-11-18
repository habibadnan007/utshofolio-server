import { RequestHandler } from 'express'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import AppError from '../../errors/appError'
import { projectServices } from './project.service'

// Insert a new project
const insertProject: RequestHandler = catchAsync(async (req, res) => {
  const project = await projectServices.insertProject(
    (req.files as { [fieldname: string]: Express.Multer.File[] }).logo[0],
    (req.files as { [fieldname: string]: Express.Multer.File[] }).banner[0],
    req.body,
  )

  sendResponse(res, StatusCodes.CREATED, {
    success: true,
    message: 'Project inserted successfully!',
    data: project,
  })
})

// Get all projects
const getAllProjects: RequestHandler = catchAsync(async (req, res) => {
  const { data, total } = await projectServices.getAllProjects(req.query) // Ensure this calls the correct service

  const page = req.query?.page ? Number(req.query.page) : 1
  const limit = req.query?.limit ? Number(req.query.limit) : 10
  const totalPage = Math.ceil(total / limit)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Projects retrieved successfully!',
    data,
    meta: { total, page, totalPage, limit },
  })
})

// Get a single project by ID
const getProjectById: RequestHandler = catchAsync(async (req, res) => {
  const project = await projectServices.getProjectById(req.params?.id)
  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Project retrieved successfully!',
    data: project,
  })
})

// Update a single project by ID
const updateProjectById: RequestHandler = catchAsync(async (req, res) => {
  const project = await projectServices.updateProjectById(
    req.params?.id,
    (req.files as { [fieldname: string]: Express.Multer.File[] })?.logo?.[0] ??
      null,
    (req.files as { [fieldname: string]: Express.Multer.File[] })
      ?.banner?.[0] ?? null,
    req.body,
  )
  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Project updated successfully!',
    data: project,
  })
})

// Delete a single project by ID
const deleteProjectById: RequestHandler = catchAsync(async (req, res) => {
  const project = await projectServices.deleteProjectById(req.params?.id)
  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Project deleted successfully!',
    data: project,
  })
})

export const projectController = {
  insertProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
}
