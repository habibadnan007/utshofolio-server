type TExperience = {
  companyName: string
  role: string
  timePeriod: string
  jobType: 'Remote' | 'On Site' | 'Hybrid'
  location?: string
  description?: string
  position: number
  isCourse: boolean
  isDeleted: boolean
}

export { TExperience }
