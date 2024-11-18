import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { statsService } from './stats.service'

const getDashboardStats = catchAsync(async (req, res) => {
  const data = await statsService.getDashboardStats()

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Dashboard stats are retrieved successfully!',
    data,
  })
})

export const statsControllers = {
  getDashboardStats,
}
