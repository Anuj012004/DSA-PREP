export interface Question {
  _id: string
  title: string
  description: string
  exampleInput: string
  exampleOutput: string
  constraints: string
  hint: string
}

export interface ApiResponse {
  source: 'ai' | 'cache'
  topic: string
  difficulty: string
  date: string
  questions: Question[]
}

export type Difficulty = 'easy' | 'medium' | 'hard'

export type Topic =
  | 'array'
  | 'string'
  | 'sliding-window'
  | 'hashmap'
  | 'stack'
  | 'queue'
  | 'linked-list'
  | 'dp'
  | 'recursion'
  | 'binary-search'


  export const TOPICS = [
  { id: 'array' as Topic, label: 'Array', icon: '📦' },
  { id: 'string' as Topic, label: 'String', icon: '🔤' },
  { id: 'sliding-window' as Topic, label: 'Sliding Window', icon: '🪟' },
  { id: 'hashmap' as Topic, label: 'HashMap', icon: '🗺️' },
  { id: 'stack' as Topic, label: 'Stack', icon: '📚' },
  { id: 'queue' as Topic, label: 'Queue', icon: '🔁' },
  { id: 'linked-list' as Topic, label: 'Linked List', icon: '🔗' },
  { id: 'dp' as Topic, label: 'DP', icon: '🧠' },
  { id: 'recursion' as Topic, label: 'Recursion', icon: '🔄' },
  { id: 'binary-search' as Topic, label: 'Binary Search', icon: '🔍' },
  { id: 'two-pointers' as Topic, label: 'Two Pointers', icon: '👉👈' },
]

export const DIFFICULTIES = [
  { id: 'easy' as Difficulty, label: 'Easy' },
  { id: 'medium' as Difficulty, label: 'Medium' },
  { id: 'hard' as Difficulty, label: 'Hard' },
]