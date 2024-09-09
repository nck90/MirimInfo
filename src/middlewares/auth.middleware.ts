import { NextResponse } from 'next/server';
import { getAuth } from 'firebase/auth';

export async function isAuthenticated() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return NextResponse.json({ success: false, message: '로그인이 필요합니다.' }, { status: 401 });
  }

  return NextResponse.next();
}
