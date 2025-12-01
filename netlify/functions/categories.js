import { Client } from "pg";

export default async () => {
  const client = new Client({
    host: "ep-weathered-wind-a1hoqhmi-pooler.ap-southeast-1.aws.neon.tech",
    port: 5432,
    database: "neondb",
    user: "neondb_owner",
    password: "npg_h9xJSM3RAfUw",
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    const result = await client.query("SELECT * FROM categories");

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.rows)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  } finally {
    await client.end();
  }
};
