import { getFirestoreInstance } from '@/utils/firebase';  // Firestore 인스턴스를 가져오는 함수
import { collection, getDocs, addDoc } from 'firebase/firestore';

// 알림 조회
export const getNotifications = async () => {
  try {
    // Firestore 인스턴스 비동기적으로 가져오기
    const db = await getFirestoreInstance();
    const notificationsCollection = collection(db, 'notifications');

    const snapshot = await getDocs(notificationsCollection);
    const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, notifications };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('알림 불러오기 중 오류:', error.message);  // 로그 추가
      return { success: false, message: `알림을 불러오는 중 오류가 발생했습니다: ${error.message}` };
    }
    console.error('알 수 없는 오류:', error);  // 알 수 없는 오류에 대한 로그 추가
    return { success: false, message: '알 수 없는 오류가 발생했습니다.' };
  }
};

// 알림 생성
export const createNotification = async (data: { message: string; classId: number }) => {
  try {
    const { message, classId } = data;

    // 유효성 검사
    if (!message || !classId) {
      return { success: false, message: '필수 필드가 누락되었습니다.' };
    }

    // Firestore 인스턴스 비동기적으로 가져오기
    const db = await getFirestoreInstance();
    const notificationsCollection = collection(db, 'notifications');

    await addDoc(notificationsCollection, { message, classId });
    return { success: true, newNotification: { message, classId } };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('알림 저장 중 오류:', error.message);  // 로그 추가
      return { success: false, message: `알림을 저장하는 중 오류가 발생했습니다: ${error.message}` };
    }
    console.error('알 수 없는 오류:', error);  // 알 수 없는 오류에 대한 로그 추가
    return { success: false, message: '알 수 없는 오류가 발생했습니다.' };
  }
};
