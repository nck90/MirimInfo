import { NextResponse } from 'next/server';
import { getFirestoreInstance, getAuthInstance } from '@/utils/firebase'; // Firebase 인스턴스 가져오기
import { doc, getDoc } from 'firebase/firestore';

/**
 * 역할을 확인하여 접근 권한을 제어하는 미들웨어
 * @param req - 들어오는 요청 객체
 * @param requiredRole - 필요한 사용자 역할 (예: 'admin', 'teacher', 'student')
 * @returns 접근 권한이 없을 경우 403 응답, 그렇지 않으면 요청을 계속 처리
 */
export async function checkUserRole(req: Request, requiredRole: string) {
  try {
    // Firebase Auth 인스턴스 가져오기
    const auth = await getAuthInstance();
    const currentUser = auth.currentUser;

    // 인증되지 않은 경우 처리
    if (!currentUser) {
      return NextResponse.json({ success: false, message: '로그인이 필요합니다.' }, { status: 401 });
    }

    // Firestore 인스턴스 가져오기
    const db = await getFirestoreInstance();
    const userDocRef = doc(db, 'users', currentUser.uid);
    const userDoc = await getDoc(userDocRef);

    // 사용자 문서가 존재하지 않는 경우 처리
    if (!userDoc.exists()) {
      return NextResponse.json({ success: false, message: '사용자 정보를 찾을 수 없습니다.' }, { status: 404 });
    }

    const userData = userDoc.data();
    
    // 사용자의 역할이 필요한 역할과 일치하지 않는 경우 처리
    if (!userData || userData.role !== requiredRole) {
      return NextResponse.json({ success: false, message: '권한이 없습니다.' }, { status: 403 });
    }

    // 역할이 일치하면 요청을 계속 처리
    return NextResponse.next();
    
  } catch (error: unknown) {
    console.error('역할 확인 중 오류:', error instanceof Error ? error.message : error);
    return NextResponse.json({ success: false, message: '역할 확인 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
