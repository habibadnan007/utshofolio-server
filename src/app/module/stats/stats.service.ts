import Project from '../project/Project.model'
import Experience from '../experience/experience.model'
import Education from '../education/education.model'

const getDashboardStats = async () => {
  const totalProject = await Project.countDocuments()
  const totalFeaturedProject = await Project.find({
    isFeatured: true,
  }).countDocuments()
  const totalExperience = await Experience.find({
    isCourse: false,
  }).countDocuments()
  const totalCourse = await Experience.find({
    isCourse: true,
  }).countDocuments()
  const totalEducation = await Education.countDocuments()
  return {
    totalProject,
    totalFeaturedProject,
    totalExperience,
    totalCourse,
    totalEducation,
  }
}

export const statsService = {
  getDashboardStats,
}
