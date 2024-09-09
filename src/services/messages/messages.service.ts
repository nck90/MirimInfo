// src/services/message.service.ts
import { getFirestoreInstance } from '@/utils/firebase'; // Firebase Firestore 인스턴스 가져오기
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

/**
 * 학급별 메시지를 조회하는 함수
 * @param classId - 학급 ID
 * @returns 해당 학급의 메시지 목록
 */
export const getMessagesByClass = async (classId: number) => {
  try {
    const db = await getFirestoreInstance(); // 안전하게 Firestore 인스턴스를 가져오기
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, where('classId', '==', classId));
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, messages };
  } catch (error: unknown) {
    console.error('Error fetching messages:', error);
    return { success: false, message: '메시지를 불러오는 중 오류가 발생했습니다.' };
  }
};

/**
 * 새로운 메시지를 생성하는 함수
 * @param data - 메시지 데이터 (senderId, content, classId)
 * @returns 생성된 메시지
 */
export const createMessage = async (data: { senderId: string; content: string; classId: number }) => {
  try {
    const db = await getFirestoreInstance(); // 안전하게 Firestore 인스턴스를 가져오기

    // 데이터 유효성 검사
    if (!data.senderId || !data.content || !data.classId) {
      return { success: false, message: '필수 데이터가 누락되었습니다.' };
    }

    const newMessageRef = await addDoc(collection(db, 'messages'), data);
    const newMessage = { id: newMessageRef.id, ...data };
    
    return { success: true, message: newMessage };
  } catch (error: unknown) {
    console.error('Error saving message:', error);
    return { success: false, message: '메시지를 저장하는 중 오류가 발생했습니다.' };
  }
};
