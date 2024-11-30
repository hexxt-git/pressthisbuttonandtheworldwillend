import { createClient } from "@libsql/client";

const client = createClient({
    url: process.env.db_url,
    authToken: process.env.db_auth,
});

client.execute(`
  CREATE TABLE IF NOT EXISTS ips (
    ip TEXT PRIMARY KEY
  )
`);

export const get = async (ip) => {
    const result = await client.execute("SELECT ip FROM ips WHERE ip = ?", [ip]);
    return result.rows.length === 0;
};

export const set = async (ip) => {
    await client.execute("INSERT OR IGNORE INTO ips (ip) VALUES (?)", [ip]);
};
