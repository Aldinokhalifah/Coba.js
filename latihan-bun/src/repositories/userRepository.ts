import { type User } from "../models/User";

export class UserRepository {
    // Simulasi database di dalam memori
    private users: User[] = [
        { id: 1, nama: "Aldino", role: "Fullstack Developer" },
        { id: 2, nama: "Budi", role: "Backend Engineer" }
    ];

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async findByName(nama: string): Promise<User | undefined> {
        return this.users.find((u) => u.nama.toLocaleLowerCase() === nama.toLocaleLowerCase());
    }

    async createUser(user: User): Promise<User | undefined> {
        this.users.push(user);
        return user;
    }

    async updateUser(id: number, user: User): Promise<User | undefined> {
        const userIndex = this.users.findIndex((u) => u.id === id);

        if (userIndex === -1) {
            return undefined;
        }

        const existingUser = this.users[userIndex]!;
        existingUser.nama = user.nama;
        existingUser.role = user.role;

        this.users[userIndex] = existingUser;
        return existingUser;
    }

    async deleteUser(id: number): Promise<User | undefined> {
        const userIndex = this.users.findIndex((u) => u.id === id);

        if (userIndex === -1) {
            return undefined;               
        }

        const [deletedUser] = this.users.splice(userIndex, 1);
        return deletedUser;                
    }
}