import axios from 'axios'
import type { ApiResponse, Topic, Difficulty } from '../types/index'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:2121'

export const fetchQuestions = async (
  topic: Topic,
  difficulty: Difficulty
): Promise<ApiResponse> => {

  const response = await axios.post<ApiResponse>(`${API_URL}/api/questions`, {
    topic,
    difficulty
  })

  return response.data
}