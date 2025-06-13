import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        // Admin хуудаснуудад зөвхөн admin нэвтрэх
        if (
            req.nextUrl.pathname.startsWith('/admin') &&
            req.nextauth.token?.role !== 'ADMIN'
        ) {
            return new Response('Unauthorized', { status: 401 });
        } // Нэвтрээгүй хэрэглэгчийг login хуудасруу чиглүүлэх
        if (
            !req.nextauth.token &&
            (req.nextUrl.pathname.startsWith('/account') ||
                req.nextUrl.pathname.startsWith('/shop/cart'))
        ) {
            return NextResponse.redirect(new URL('/auth/login', req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // Admin хуудаснууд
                if (req.nextUrl.pathname.startsWith('/admin')) {
                    return token?.role === 'ADMIN';
                } // Account болон cart хуудаснууд - нэвтрэх шаардлагатай
                if (
                    req.nextUrl.pathname.startsWith('/account') ||
                    req.nextUrl.pathname.startsWith('/shop/cart')
                ) {
                    return !!token;
                }

                return true;
            },
        },
    },
);

export const config = {
    matcher: ['/admin/:path*', '/account/:path*', '/shop/cart/:path*'],
};
