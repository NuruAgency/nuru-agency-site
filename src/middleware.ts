import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const adminSession = request.cookies.get('nuru_admin_session');
    const path = request.nextUrl.pathname;

    // On protège toute la zone /admin
    if (path.startsWith('/admin')) {
        // Si on essaie d'aller sur /admin mais qu'on n'est pas loggé -> Go Login
        if (!adminSession && path !== '/admin/login') {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
        // Si on est déjà loggé et qu'on va sur /admin/login -> Go Dashboard
        if (adminSession && path === '/admin/login') {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    return NextResponse.next();
}

// On applique le middleware uniquement sur les routes admin
export const config = {
    matcher: ['/admin/:path*'],
};