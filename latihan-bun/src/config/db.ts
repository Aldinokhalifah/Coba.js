import { Pool, type QueryResult } from "pg";
// Di Bun, Anda tidak wajib menginstal dotenv karena Bun membaca file .env secara otomatis!
// Tapi jika ingin tetap eksplisit, gunakan import:
import "dotenv/config"; 

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on("error", (err: Error) => {
    console.error('Unexpected DB error', err);
    process.exit(-1);
});

// Menambahkan static type pada return value fungsi
export async function testConnection(): Promise<boolean> {
    try {
        const res = await pool.query("SELECT 1 AS ok");
        return res.rows[0]?.ok === 1;
    } catch (err: any) {
        console.error("PostgreSQL connection test failed:", err.message);
        return false;
    }
}

// Mengganti module.exports dengan ES Module export khas TypeScript
export const db = {
    query: (text: string, params?: any[]): Promise<QueryResult> => pool.query(text, params),
    pool,
    testConnection
};