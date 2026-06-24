import { UserRepository } from "../repositories/userRepository";
import type { User } from "../models/User";

export class UserService {
    private userRepo = new UserRepository();

    async getAllUsers(): Promise<User[]> {
        return await this.userRepo.findAll();
    }

    async getUserByName(nama: string): Promise<User | undefined> {
        return await this.userRepo.findByName(nama);
    }

    async createUser(user: User): Promise<User | undefined> {
        if(!user.id) {
            throw new Error('ID user wajib diisi');
        } else if(!user.nama) {
            throw new Error('Nama user wajib diisi');
        } else if(!user.role) {
            throw new Error('Role user wajib diisi');
        } else {
            await this.userRepo.createUser(user);
            return user;
        }
    }

    async updateUser(id: number, user: User): Promise<User | undefined> {

        const updatedUser = await this.userRepo.updateUser(id, user);

        if(!updatedUser) {
            throw new Error("ID user tidak ditemukan")
        }
        return updatedUser;
    }

    async deleteUser(id: number): Promise<User | undefined> {
        const deletedUser = await this.userRepo.deleteUser(id);

        return deletedUser;
    }
}
