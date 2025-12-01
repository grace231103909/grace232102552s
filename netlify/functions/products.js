import { Client } from "pg";

export default async () => {
  const client = new Client({
    host: "YOUR_HOST",
    port: 5432,
    database: "YOUR_DBNAME",
    user: "YOUR_USER",
    password: "YOUR_PASSWORD",
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    const result = await client.query("SELECT * FROM products");

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
