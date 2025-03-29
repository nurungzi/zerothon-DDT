// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // 백엔드 주소 (수정 가능)

export async function createTodo(todoData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/todos`, todoData);
    return response.data;
  } catch (error) {
    console.error('할일 등록 중 오류 발생:', error);
    throw error;
  }
}
