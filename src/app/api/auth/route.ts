import { NextResponse } from 'next/server';
import { login, register, logout } from '../../../services/auth/auth.service';

export async function POST(req: Request) {
  try {
    const { action, email, password } = await req.json();

    if (!email || !password || !['login', 'register'].includes(action)) {
      return NextResponse.json({ success: false, message: '잘못된 요청입니다.' }, { status: 400 });
    }

    let result;

    if (action === 'login') {
      result = await login(email, password);
    } else if (action === 'register') {
      result = await register(email, password);
    }

    // result가 undefined인 경우를 처리합니다.
    if (!result) {
      return NextResponse.json({ success: false, message: '알 수 없는 오류가 발생했습니다.' }, { status: 500 });
    }

    if (result.success) {
      return NextResponse.json(result.user);
    } else {
      return NextResponse.json({ success: false, message: result.message }, { status: 400 });
    }
  } catch (error) {
    console.error('Failed to handle auth request:', error);
    return NextResponse.json({ success: false, message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const result = await logout();

    // result가 undefined인 경우를 처리합니다.
    if (!result) {
      return NextResponse.json({ message: '알 수 없는 오류가 발생했습니다.' }, { status: 500 });
    }

    if (result.success) {
      return NextResponse.json({ message: 'Logged out successfully' });
    } else {
      return NextResponse.json({ message: result.message }, { status: 400 });
    }
  } catch (error) {
    console.error('Failed to logout:', error);
    return NextResponse.json({ message: '로그아웃 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
