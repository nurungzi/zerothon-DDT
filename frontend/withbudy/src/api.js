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

// ✅ 목표 등록 예시
export async function createTodo(data) {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/todos`, data);
        return response.data;
    } catch (error) {
        console.error('❌ 목표 등록 중 오류:', error);
        throw error;
    }
}

// 알림 데이터 조회 (현재 사용자 기준)
export async function fetchNotifications(userId) {
    const response = await axios.get(`/api/notifications?userId=${userId}`);
    return response.data;
}


// ✅ 날짜별 할일 목록 조회 (GET)
export const fetchTodoByDate = async (userId) => {
    const response = await axios.get(`/api/todos/date?id=${userId}`);
    return response.data;
};
