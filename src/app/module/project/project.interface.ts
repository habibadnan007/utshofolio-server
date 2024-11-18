type TProject = {
  title: string
  logo: string
  banner: string
  description: string
  category: 'Full Stack' | 'Frontend' | 'Backend'
  technologies: string[]
  demoUrl?: string
  githubUrl?: {
    frontend?: string
    backend?: string
  }
  position?: number
  isFeatured: boolean
  tags?: string[] | undefined
  status: 'In Progress' | 'Completed'
  role: 'Full Stack Developer' | 'Frontend Developer' | 'Backend Developer'
  isDeleted: boolean
}

export { TProject }
