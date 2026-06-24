import { UserService } from "../services/userService";
import type { Request, Response } from "express";

export class UserController {
    private userService = new UserService();

    getUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await this.userService.getAllUsers();
            res.json({ status: "success", data: users });
        } catch (error) {
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    };

    getByName = async (req: Request, res: Response): Promise<void> => {
        try {
            const namaQuery = (req.query.nama as string) || (req.query.name as string) || "";
            if (!namaQuery) {
                res.status(400).json({ status: "error", message: "Query parameter 'nama' is required" });
                return;
            }

            const user = await this.userService.getUserByName(namaQuery);
            if (!user) {
                res.status(404).json({ status: "error", message: "User not found" });
                return;
            }

            res.json({ status: "success", data: user });
        } catch (error) {
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    }

    createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.body;

            if (!user || Object.keys(user).length === 0) {
                res.status(400).json({ status: 'error', message: 'Body user wajib diisi' });
                return;
            }

            const response = await this.userService.createUser(user);

            res.status(201).json({
                status: 'success',
                message: 'User berhasil dibuat',
                data: response
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ status: 'error', message: error.message });
            } else {
                res.status(500).json({ status: "error", message: "Internal Server Error" });
            }
        }
    }

    updateUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;              

            const user = req.body;
            if (!user || Object.keys(user).length === 0) {
                res.status(400).json({ status: 'error', message: 'Body user wajib diisi' });
                return;
            }

            const response = await this.userService.updateUser(id, user);
            res.status(200).json({
                status: 'success',
                message: 'User berhasil diupdate',
                data: response,
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ status: 'error', message: error.message });
            } else {
                res.status(500).json({ status: "error", message: "Internal Server Error" });
            }
        }
    };

    deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;

            const deleted = await this.userService.deleteUser(id);
            if (!deleted) {
                res.status(404).json({ status: 'error', message: 'User tidak ditemukan' });
                return;
            }

            res.status(200).json({
                status: 'success',
                message: 'User berhasil dihapus',
                data: deleted,
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ status: 'error', message: error.message });
            } else {
                res.status(500).json({ status: "error", message: "Internal Server Error" });
            }
        }
    };
}