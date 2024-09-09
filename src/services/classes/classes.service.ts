import { getFirestoreInstance } from '@/utils/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { FirestoreClass } from '../../types';

// 모든 학급을 조회하는 함수
export async function getAllClasses() {
  try {
    const db = await getFirestoreInstance();  // Firestore 인스턴스를 비동기로 가져옴
    const classesCollection = collection(db, 'classes');  // 'classes' 컬렉션 참조
    const classSnapshot = await getDocs(classesCollection);  // 모든 문서 가져오기
    const classList: FirestoreClass[] = classSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FirestoreClass));  // 문서 데이터를 배열로 변환
    return { success: true, classes: classList };  // 성공적으로 학급 목록 반환
  } catch (error) {
    console.error('Failed to get classes:', error);  // 오류 로그 출력
    return { success: false, message: 'Failed to get classes' };  // 실패 시 오류 메시지 반환
  }
}

// 새로운 학급을 추가하는 함수
export async function createClass(data: Omit<FirestoreClass, 'id'>) {
  try {
    const db = await getFirestoreInstance();  // Firestore 인스턴스를 비동기로 가져옴
    const classesCollection = collection(db, 'classes');  // 'classes' 컬렉션 참조
    const docRef = await addDoc(classesCollection, data);  // 새 문서 추가
    return { success: true, class: { id: docRef.id, ...data } as FirestoreClass };  // 성공적으로 추가된 학급 반환
  } catch (error) {
    console.error('Failed to create class:', error);  // 오류 로그 출력
    return { success: false, message: 'Failed to create class' };  // 실패 시 오류 메시지 반환
  }
}
