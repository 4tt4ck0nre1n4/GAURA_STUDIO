import { NextResponse } from 'next/server';

export function middleware(request) {
  // Basic認証の設定
  const basicAuth = request.headers.get('authorization');
  const url = request.nextUrl;

  // 本番環境でのみBasic認証を有効にする
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production') {
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // 認証情報の設定（環境変数から取得）
      const validUser = process.env.BASIC_AUTH_USER || 'gaura';
      const validPassword = process.env.BASIC_AUTH_PASSWORD || 'studio2024';

      if (user === validUser && pwd === validPassword) {
        return NextResponse.next();
      }
    }
    url.pathname = '/api/auth';

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
