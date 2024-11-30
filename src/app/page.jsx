import { get } from "@/services/db";
import Client from "./client";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function () {
    const ip = (await headers()).get('x-client-ip')
    const allowed = await get(ip)
    console.log({allowed, ip})

    return <>{allowed && <Client />}</>;
}
