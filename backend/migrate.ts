import fs from "fs";
import path from "path";
import pg from "pg";

const { Pool } = pg;

const db = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

const migrationPath = path.join(
  process.cwd(),
  "migrations",
  "001-create-todos.sql"
);

const sql = fs.readFileSync(migrationPath, "utf8");

async function migrate() {
  try {
    console.log("Running migration...");

    await db.query(sql);

    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await db.end();
  }
}

migrate();