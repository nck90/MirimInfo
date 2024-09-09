// src/services/auth/auth.service.ts
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getAuthInstance } from '@/utils/firebase'; // Firebase Auth 인스턴스

export async function login(email: string, password: string) {
  try {
    const auth = await getAuthInstance(); // 비동기 처리
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: unknown) {
    let message = '알 수 없는 오류가 발생했습니다.';

    if (error instanceof Error) {
      switch (error.message) {
        case 'auth/user-not-found':
          message = '사용자를 찾을 수 없습니다.';
          break;
        case 'auth/wrong-password':
          message = '비밀번호가 잘못되었습니다.';
          break;
        case 'auth/invalid-email':
          message = '잘못된 이메일 형식입니다.';
          break;
        default:
          message = error.message;
      }
    }

    return { success: false, message };
  }
}

export async function register(email: string, password: string) {
  try {
    const auth = await getAuthInstance(); // 비동기 처리
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: unknown) {
    let message = '알 수 없는 오류가 발생했습니다.';

    if (error instanceof Error) {
      switch (error.message) {
        case 'auth/email-already-in-use':
          message = '이미 사용 중인 이메일입니다.';
          break;
        case 'auth/weak-password':
          message = '비밀번호가 너무 약합니다.';
          break;
        case 'auth/invalid-email':
          message = '잘못된 이메일 형식입니다.';
          break;
        default:
          message = error.message;
      }
    }

    return { success: false, message };
  }
}

export async function logout() {
  try {
    const auth = await getAuthInstance(); // 비동기 처리
    await signOut(auth);
    return { success: true };
  } catch (error: unknown) {
    return { success: false, message: '로그아웃 중 오류가 발생했습니다.' };
  }
}
