import { collection, getDocs, addDoc } from 'firebase/firestore';
import { getFirestoreInstance } from '@/utils/firebase';  // Firebase Firestore 인스턴스

/**
 * Firestore 컬렉션 참조를 비동기로 가져오는 함수
 */
const getAnnouncementsCollection = async () => {
  const db = await getFirestoreInstance();  // 비동기로 Firestore 인스턴스를 가져옴
  return collection(db, 'announcements');   // 컬렉션 참조 반환
};

/**
 * 모든 공지사항을 조회하는 함수
 * @returns 공지사항 목록
 */
export const getAllAnnouncements = async () => {
  try {
    const announcementsCollection = await getAnnouncementsCollection();  // 컬렉션 참조 비동기로 가져오기
    const snapshot = await getDocs(announcementsCollection);
    const announcements = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, announcements };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('공지사항을 불러오는 중 오류:', error.message);
    }
    return { success: false, message: '공지사항을 불러오는 중 오류가 발생했습니다.' };
  }
};

/**
 * 새로운 공지사항을 생성하는 함수
 * @param data - 공지사항 데이터 (title, content, sender)
 * @returns 생성된 공지사항
 */
export const createAnnouncement = async (data: { title: string; content: string; sender: string }) => {
  try {
    const { title, content, sender } = data;

    // 유효성 검사
    if (!title || !content || !sender) {
      return { success: false, message: '필수 필드가 누락되었습니다.' };
    }

    const announcementsCollection = await getAnnouncementsCollection();  // 컬렉션 참조 비동기로 가져오기
    const docRef = await addDoc(announcementsCollection, { title, content, sender });
    return { success: true, announcement: { id: docRef.id, title, content, sender } };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('공지사항을 저장하는 중 오류:', error.message);
    }
    return { success: false, message: '공지사항을 저장하는 중 오류가 발생했습니다.' };
  }
};
