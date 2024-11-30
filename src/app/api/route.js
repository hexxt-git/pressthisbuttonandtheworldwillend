import { set } from "../../services/db";

export async function POST(request) {
    const ip = request.headers.get("x-forwarded-for") || request.connection.remoteAddress;

    await set(ip);
    
    console.log("Blocked IP:", ip);

    return new Response(JSON.stringify({ message: "ok" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
