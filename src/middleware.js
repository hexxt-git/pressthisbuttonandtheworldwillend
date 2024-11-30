import { NextResponse } from "next/server";

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  const ip = requestHeaders.get("x-forwarded-for") || requestHeaders.get("remote-addr");
  
  requestHeaders.set("x-client-ip", ip);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}