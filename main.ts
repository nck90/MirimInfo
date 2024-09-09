import next from 'next';
import express, { Request, Response } from 'express';
import { initializeDatabase } from '@/utils/typeorm';
import 'reflect-metadata';

// Next.js 앱 초기화
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Express 서버 설정
const server = express();

const port = process.env.PORT || 3000;  // 서버가 실행될 포트 설정

// 서버 준비
app.prepare().then(async () => {
  try {
    // 데이터베이스 초기화
    await initializeDatabase();
    console.log('데이터베이스가 성공적으로 초기화되었습니다.');

    // 모든 요청을 Next.js가 처리하도록 설정
    server.all('*', (req: Request, res: Response) => handle(req, res));

    // 서버 실행
    server.listen(port, () => {
      console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
    });
  } catch (error) {
    console.error('서버 초기화 중 오류가 발생했습니다:', error);
    process.exit(1);  // 에러 발생 시 프로세스 종료
  }
});
