import Client from "./client";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function () {
    const allowed = (await headers()).get("allowed");

    return <>{allowed !== "false" && <Client />}</>;
}
