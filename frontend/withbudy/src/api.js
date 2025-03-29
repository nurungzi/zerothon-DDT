import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // 백엔드 주소 (변경 가능)

// ✅ 친구 추가 요청
export async function requestFriend(requesterId, responserId) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/buddys`, {
      requesterId,
      responserId
    });
    return response.data;
  } catch (error) {
    console.error('❌ 친구 요청 중 오류:', error);
    throw error;
  }
}

// ✅ 목표 등록
export async function createTodo(data) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/todos`, data);
    return response.data;
  } catch (error) {
    console.error('❌ 목표 등록 중 오류:', error);
    throw error;
  }
}

// ✅ 날짜별 할일 목록 조회
export async function fetchTodoByDate(userId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/todos/date?id=${userId}`);
    return response.data;
  } catch (error) {
    console.error('❌ 날짜별 할일 조회 중 오류:', error);
    throw error;
  }
}

// ✅ 할일 완료 처리
export async function markTodoDone(todoId) {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/todos/done?id=${todoId}`);
    return response.data;
  } catch (error) {
    console.error('❌ 할일 완료 처리 중 오류:', error);
    throw error;
  }
}

// ✅ 알림 목록 조회 (대기 상태)
export async function fetchNotifications(userId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/notifications/waiting?id=${userId}`);
    return response.data;
  } catch (error) {
    console.error('❌ 알림 조회 중 오류:', error);
    throw error;
  }
}

// ✅ 알림 수락
export async function acceptNotification(notificationId) {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/notifications/accept?id=${notificationId}`);
    return response.data;
  } catch (error) {
    console.error('❌ 알림 수락 실패:', error);
    throw error;
  }
}
