import '../global.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <title>미림 알리미</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <header>
          <nav>
            <h1>미림 알리미</h1>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2024 미림 알리미. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
