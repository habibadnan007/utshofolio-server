enum TechnologyCategory {
  Frontend = 'Frontend',
  Backend = 'Backend',
  'Full Stack' = 'Full Stack',
  Tools = 'Tools',
}

type TTechnology = {
  name: string
  category: TechnologyCategory
  isFeatured: boolean
  position: number
  isDeleted: boolean
}

export { TTechnology, TechnologyCategory }
