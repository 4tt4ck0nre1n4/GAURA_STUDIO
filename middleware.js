import { next } from '@vercel/edge';

export default function middleware(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  console.log(`=== Middleware processing: ${pathname} ===`);
  console.log(`Full URL: ${url.toString()}`);
  console.log(`Request method: ${request.method}`);

  // 静的アセットは認証をスキップ
  const isStaticAsset = pathname.startsWith('/assets/') ||
                       pathname.endsWith('.jpg') ||
                       pathname.endsWith('.jpeg') ||
                       pathname.endsWith('.png') ||
                       pathname.endsWith('.gif') ||
                       pathname.endsWith('.svg') ||
                       pathname.endsWith('.ico') ||
                       pathname.endsWith('.css') ||
                       pathname.endsWith('.js') ||
                       pathname.endsWith('.woff') ||
                       pathname.endsWith('.woff2') ||
                       pathname.endsWith('.ttf') ||
                       pathname.endsWith('.webmanifest') ||
                       pathname.endsWith('.webp') ||
                       pathname.endsWith('.avif') ||
                       pathname === '/favicon.ico' ||
                       pathname === '/favicon.svg' ||
                       pathname === '/apple-touch-icon.png' ||
                       pathname === '/manifest.webmanifest' ||
                       pathname === '/_favicon.svg';

  if (isStaticAsset) {
    console.log(`✅ Skipping auth for static asset: ${pathname}`);
    console.log(`Static asset check: startsWith /assets/ = ${pathname.startsWith('/assets/')}`);
    console.log(`Static asset check: endsWith .jpg = ${pathname.endsWith('.jpg')}`);
    return next();
  }

  console.log(`🔒 Auth required for: ${pathname}`);

  // Basic認証のチェック
  const auth = request.headers.get('authorization');

  if (!auth || !auth.startsWith('Basic ')) {
    return new Response('Basic Auth required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="GAURA STUDIO"',
      },
    });
  }

  const base64 = auth.split(' ')[1];
  const credentials = atob(base64);
  const [username, password] = credentials.split(':');

  if (username === process.env.BASIC_AUTH_USER && password === process.env.BASIC_AUTH_PASSWORD) {
    return next();
  }

  return new Response('Invalid credentials', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="GAURA STUDIO"',
    },
  });
}

export const config = {
  matcher: [
    '/(.*)',
  ],
};
