import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const userController = new UserController();

// Daftarkan semua endpoint user di sini
router.get("/", userController.getUsers);
router.post("/", userController.createUser);
router.get("/search", userController.getByName);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;