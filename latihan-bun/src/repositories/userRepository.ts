import { db } from "../config/db";
import { type User } from "../models/User";

export class UserRepository {
    // Simulasi database di dalam memori
    // private users: User[] = [
    //     { id: 1, nama: "Aldino", role: "Fullstack Developer" },
    //     { id: 2, nama: "Budi", role: "Backend Engineer" }
    // ];

    async findAll(): Promise<User[]> {
        const query =  'SELECT id, name, email, whatsapp_phone, created_at FROM users';
        const result = await db.query(query);
        return result.rows as User[];
    }

    async findByName(nama: string): Promise<User[] | undefined> {
        const query = 'SELECT id, name, email, whatsapp_phone, created_at FROM users WHERE name ILIKE $1'
        const result = await db.query(query, [`%${nama}%`]);
        return result.rows as User[]
    }

    async createUser(user: User): Promise<User | undefined> {
        const query = 
            `INSERT INTO users (name, email, password_hash, whatsapp_phone)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, email, avatar_url, whatsapp_phone, created_at`
        const result = await db.query(query, [user.name, user.email, user.password, user.whatsapp_phone])
        return result.rows[0]
    }

    async updateUser(id: string, user: User): Promise<User | undefined> {
        // Bangun query dinamis (hanya kolom yang ada yang di‑update)
        const fields: string[] = [];
        const values: any[] = [id]; // $1 = id (UUID)

        if (user.name !== undefined) {
            fields.push(`name = $${values.length + 1}`);
            values.push(user.name);
        }
        if (user.email !== undefined) {
            fields.push(`email = $${values.length + 1}`);
            values.push(user.email);
        }
        if (user.password !== undefined) {
            fields.push(`password_hash = $${values.length + 1}`);
            values.push(user.password);
        }
        if (user.whatsapp_phone !== undefined) {
            fields.push(`whatsapp_phone = $${values.length + 1}`);
            values.push(user.whatsapp_phone);
        }

        // Jika tidak ada field yang di‑update, cukup kembalikan data lama
        if (fields.length === 0) {
            const result = await db.query(
                `SELECT id, name, email, avatar_url, whatsapp_phone, created_at FROM users WHERE id = $1`,
                [id]
            );
            return result.rows[0];
        }

        const query = `
            UPDATE users
            SET ${fields.join(", ")}
            WHERE id = $1
            RETURNING id, name, email, avatar_url, whatsapp_phone, created_at`;

        const result = await db.query(query, values);
        return result.rows[0];
    }

    async deleteUser(id: string): Promise<User | undefined> {
        const result = await db.query(
            `DELETE FROM users
            WHERE id = $1
            RETURNING id, name, email, avatar_url, whatsapp_phone, created_at`,
            [id]
        );
        return result.rows[0];
    }
}