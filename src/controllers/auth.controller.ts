import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuthInstance } from '@/utils/firebase';  // Auth 인스턴스를 가져오는 함수

// 로그인 처리
export const login = async (email: string, password: string) => {
  try {
    const auth = getAuthInstance(); // Auth 인스턴스를 가져옴
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Firebase에서 발생한 오류 코드를 처리
      if ('code' in error) {
        switch (error.code) {
          case 'auth/user-not-found':
            return { success: false, message: '사용자를 찾을 수 없습니다.' };
          case 'auth/wrong-password':
            return { success: false, message: '비밀번호가 잘못되었습니다.' };
          default:
            return { success: false, message: error.message };
        }
      }
    }
    return { success: false, message: '알 수 없는 오류가 발생했습니다.' };
  }
};

// 회원가입 처리
export const register = async (email: string, password: string) => {
  try {
    const auth = getAuthInstance(); // Auth 인스턴스를 가져옴
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Firebase에서 발생한 오류 코드를 처리
      if ('code' in error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            return { success: false, message: '이미 사용 중인 이메일입니다.' };
          case 'auth/invalid-email':
            return { success: false, message: '잘못된 이메일 형식입니다.' };
          case 'auth/weak-password':
            return { success: false, message: '비밀번호가 너무 약합니다.' };
          default:
            return { success: false, message: error.message };
        }
      }
    }
    return { success: false, message: '알 수 없는 오류가 발생했습니다.' };
  }
};
