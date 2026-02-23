import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUser,
} from "../controllers/user.controller";
import {
  validate,
  createUserValidation,
  getUserByIdValidation,
} from "../validations/user.validation";

const router = Router();

router.get('/', getAllUsers);
router.get('/search', searchUser);
router.get('/:id', validate(getUserByIdValidation), getUserById);
router.post('/', validate(createUserValidation), createUser);
router.put('/:id', validate(createUserValidation), updateUser);
router.delete('/:id', validate(getUserByIdValidation), deleteUser);

export default router;