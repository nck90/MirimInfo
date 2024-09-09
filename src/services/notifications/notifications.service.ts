// src/services/notification.service.ts
import { getFirestoreInstance } from '@/utils/firebase'; // Firebase Firestore 인스턴스 가져오기
import { collection, getDocs, addDoc } from 'firebase/firestore';

/**
 * 모든 알림을 조회하는 함수
 * @returns 알림 목록
 */
export const getAllNotifications = async () => {
  try {
    const db = await getFirestoreInstance(); // 안전하게 Firestore 인스턴스 가져오기
    const notificationsRef = collection(db, 'notifications');
    const querySnapshot = await getDocs(notificationsRef);
    const notifications = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, notifications };
  } catch (error: unknown) {
    console.error('알림 불러오기 중 오류:', error);
    return { success: false, message: '알림을 불러오는 중 오류가 발생했습니다.' };
  }
};

/**
 * 새로운 알림을 생성하는 함수
 * @param data - 알림 데이터 (message, classId)
 * @returns 생성된 알림
 */
export const createNotification = async (data: { message: string; classId: number }) => {
  try {
    const db = await getFirestoreInstance(); // 안전하게 Firestore 인스턴스 가져오기

    // message 유효성 검사
    if (!data.message || data.message.trim() === '') {
      return { success: false, message: '알림 메시지는 필수 입력 항목입니다.' };
    }

    // classId 유효성 검사
    if (typeof data.classId !== 'number' || isNaN(data.classId)) {
      return { success: false, message: 'classId는 유효한 숫자여야 합니다.' };
    }

    const newNotificationRef = await addDoc(collection(db, 'notifications'), data);
    const newNotification = { id: newNotificationRef.id, ...data };

    return { success: true, notification: newNotification };
  } catch (error: unknown) {
    console.error('알림 저장 중 오류:', error);
    return { success: false, message: '알림을 저장하는 중 오류가 발생했습니다.' };
  }
};
