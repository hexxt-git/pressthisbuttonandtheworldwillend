import { NextResponse } from "next/server";
import { get } from "./services/db";

export async function middleware(request) {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");

    const requestHeaders = new Headers(request.headers);

    const allowed = await get(ip)

    requestHeaders.set('allowed', allowed);

    // You can also set request headers in NextResponse.next
    const response = NextResponse.next({
        request: {
            // New request headers
            headers: requestHeaders,
        },
    });

    return response;
}
