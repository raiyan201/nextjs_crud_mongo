import { useRouter } from "next/navigation";
import { NextResponse } from 'next/server'


export function middleware(request){
    const path=request.nextUrl.pathname;
    console.log('path,',path)
    // const router=useRouter();

    const isPublicPath = path === '/login' || path === '/register';
    const token=request.cookies.get('jwt_token')?.value ||"";

    console.log('isPublicPath',isPublicPath)
    console.log('token',token)

    if(isPublicPath  && token){
        return NextResponse.redirect(new URL(path,request.nextUrl));
    }

    if(!isPublicPath  && !token){
        return NextResponse.redirect(new URL('/login',request.nextUrl));
    }   
}


export const config={
    matcher: ['/', '/login', '/register', '/profile','/dashboard'],
}
