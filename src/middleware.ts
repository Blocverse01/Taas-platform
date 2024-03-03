import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const AUTH_ROUTES = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  let redirect: string | undefined;

  const isAuthenticationRoute = AUTH_ROUTES.includes(request.nextUrl.pathname);

  if (token && isAuthenticationRoute) {
    redirect = "/dashboard";
  }
  if (!token && !isAuthenticationRoute) {
    redirect = "/login";
  }

  const response = redirect
    ? NextResponse.redirect(new URL(redirect, request.url))
    : NextResponse.next();
  return response;
}

export const config = { matcher: ["/dashboard/:path*", "/login", "/signup", "/playground"] };
