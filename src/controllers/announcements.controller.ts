// src/services/announcements.ts
import { getFirestoreInstance } from '@/utils/firebase';  // Firestore 인스턴스를 가져오는 함수
import { collection, getDocs, addDoc } from 'firebase/firestore';

// Firestore 컬렉션 참조
const announcementsCollection = collection(getFirestoreInstance(), 'announcements');

// 공지사항 조회
export const getAnnouncements = async () => {
  try {
    const snapshot = await getDocs(announcementsCollection);
    const announcements = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, announcements };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('공지사항 불러오기 오류:', error.message);
    }
    return { success: false, message: '공지사항을 불러오는 중 오류가 발생했습니다.' };
  }
};

// 공지사항 생성
export const createAnnouncement = async (data: { title: string; content: string; sender: string }) => {
  try {
    const { title, content, sender } = data;

    // 유효성 검사
    if (!title || !content || !sender) {
      return { success: false, message: '필수 필드가 누락되었습니다.' };
    }

    await addDoc(announcementsCollection, { title, content, sender });
    return { success: true, newAnnouncement: { title, content, sender } };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('공지사항 저장 오류:', error.message);
    }
    return { success: false, message: '공지사항을 저장하는 중 오류가 발생했습니다.' };
  }
};
