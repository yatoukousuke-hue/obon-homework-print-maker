export type Subject = '算数' | '国語'
export type Difficulty = 'やさしい' | '標準' | 'チャレンジ'
export type Volume = '10問/日' | '15問/日' | '20問/日'
export type ProblemStyle = '基礎中心' | '文章題ミックス' | '応用多め'

export type Unit = {
  id: string
  grade: number
  subject: Subject
  name: string
  availableMonth: number
  availableByObon: boolean
  prerequisites: string[]
  difficultyLevel: Difficulty
  description: string
}

export type RequestData = {
  id: string
  createdAt: string
  grade: number
  subject: Subject
  difficulty: Difficulty
  volume: Volume
  days: number
  problemStyle: ProblemStyle
  purpose: string
  selectedUnits: string[]
  notes: string
}

export type Problem = {
  question: string
  answer: string
  explanation?: string
  kind?: '計算' | '筆算' | '文章題' | '応用' | '語句' | '読解'
  workspace?: 'line' | 'grid' | 'vertical' | 'diagram' | 'sentence'
}

export type WorksheetPage = {
  day: number
  title: string
  problems: Problem[]
}

export type Worksheet = {
  title: string
  summary: string
  mission: string
  passage?: string
  pages: WorksheetPage[]
  problems: Problem[]
}
