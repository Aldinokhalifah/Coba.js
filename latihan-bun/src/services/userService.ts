import { UserRepository } from "../repositories/userRepository";
import type { User } from "../models/User";

export class UserService {
    private userRepo = new UserRepository();

    async getAllUsers(): Promise<User[]> {
        return await this.userRepo.findAll();
    }

    async getUserByName(nama: string): Promise<User[] | undefined> {
        return await this.userRepo.findByName(nama);
    }

    async createUser(user: User): Promise<User | undefined> {
        if(!user.name) {
            throw new Error('Nama user wajib diisi');
        } else if(!user.email) {
            throw new Error('Email user wajib diisi');
        } else if(!user.password) {
            throw new Error('Password user wajib diisi');
        } else {
            const password_hash = await Bun.password.hash(user.password, {
                algorithm: "bcrypt",
                cost: 10,
            })
            
            const createdUser = await this.userRepo.createUser({
                name: user.name,
                email: user.email,
                password: password_hash,
                whatsapp_phone: user.whatsapp_phone
            });
            return createdUser;
        }
    }

    async updateUser(id: string, user: User): Promise<User | undefined> {
        if (user.password) {
            user.password = await Bun.password.hash(user.password, {
                algorithm: "bcrypt",
                cost: 10,
            });
        }

        const updatedUser = await this.userRepo.updateUser(id, user);
        if (!updatedUser) {
            throw new Error("ID user tidak ditemukan");
        }
        return updatedUser;
    }

    async deleteUser(id: string): Promise<User | undefined> {
        const deletedUser = await this.userRepo.deleteUser(id);
        return deletedUser;
    }
}
