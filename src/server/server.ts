// src/server.ts
import express, { Request, Response } from 'express';
import next from 'next';
import { initializeFirebase } from '@/utils/firebase';  // Firebase 초기화
import { createServer, Server } from 'http';  // HTTP Server 가져오기

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const expressApp = express();

let server: Server;

async function startServer(): Promise<Server> {
  await app.prepare();

  try {
    // Firebase 초기화
    await initializeFirebase();
    console.log('Firebase 초기화 성공');

    // JSON 요청을 처리하기 위한 미들웨어 추가
    expressApp.use(express.json());

    // 모든 요청을 Next.js에서 처리
    expressApp.all('*', (req: Request, res: Response) => {
      return handle(req, res);
    });

    const port = process.env.PORT || 3000;
    server = createServer(expressApp);  // HTTP 서버로 감싸서 반환

    return new Promise((resolve, reject) => {
      server.listen(port, (err?: Error) => {
        if (err) {
          reject(err);
        } else {
          console.log(`Server running on http://localhost:${port}`);
          resolve(server);
        }
      });
    });
  } catch (error) {
    console.error('서버 실행 중 오류:', error);
    process.exit(1);  // 에러 발생 시 프로세스 종료
  }
}

export function stopServer() {
  if (server) {
    server.close((err) => {
      if (err) {
        console.error('서버 종료 중 오류:', err);
      } else {
        console.log('서버가 정상적으로 종료되었습니다.');
      }
    });
  }
}

export default startServer;
