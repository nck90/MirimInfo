// src/app/api/classes/route.ts
import { NextResponse } from 'next/server';
import { getAllClasses, createClass } from '@/services/classes/classes.service';  // 클래스 서비스 가져오기

// GET 메서드: 모든 학급 조회
export async function GET() {
  try {
    const result = await getAllClasses();
    if (result.success) {
      return NextResponse.json(result.classes);  // 성공적으로 학급 데이터 반환
    } else {
      return NextResponse.json({ success: false, message: result.message }, { status: 500 });
    }
  } catch (error) {
    console.error('Failed to fetch classes:', error);
    return NextResponse.json({ success: false, message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

// POST 메서드: 새로운 학급 추가
export async function POST(req: Request) {
  try {
    const data = await req.json();  // 요청 바디에서 데이터 추출
    const result = await createClass(data);

    if (result.success) {
      return NextResponse.json(result.class);  // 성공적으로 추가된 학급 반환
    } else {
      return NextResponse.json({ success: false, message: result.message }, { status: 400 });
    }
  } catch (error) {
    console.error('Failed to add class:', error);
    return NextResponse.json({ success: false, message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
``
