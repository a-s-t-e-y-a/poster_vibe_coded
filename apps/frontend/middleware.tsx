import { NextRequest, NextResponse } from 'next/server'
import { stackServerApp } from './stack'


const protectedRoutes = ['/dashboard']
const publicRoutes = ['/handler/sign-in', '/handler/sign-up', '/']

export default async function middleware(req: NextRequest) {

    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)


    const user = await stackServerApp.getUser()


    if (isProtectedRoute && !user) {
        return NextResponse.redirect(new URL('/handler/sign-in', req.nextUrl))
    }


    if (
        isPublicRoute &&
        user &&
        !req.nextUrl.pathname.startsWith('/dashboard')
    ) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    return NextResponse.next()
}


export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}