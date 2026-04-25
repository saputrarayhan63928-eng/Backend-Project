import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUser,
} from "../controllers/user.controller.js";
import {
  validate,
  createUserValidation,
  updateUserValidation,
  getUserByIdValidation,
} from "../validations/user.validation.js";
import { adminOnly, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyToken, adminOnly);
router.get('/', getAllUsers);
router.get('/search', searchUser);
router.get('/:id', validate(getUserByIdValidation), getUserById);
router.post('/', validate(createUserValidation), createUser);
router.put('/:id', validate(updateUserValidation), updateUser);
router.delete('/:id', validate(getUserByIdValidation), deleteUser);

export default router;
