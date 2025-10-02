import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { listAllUsers, findUserById, updateUserData, deleteUserData } from "../controllers/usersController.js";

const router = express.Router();

router.use(authenticateToken);

router.get('/', listAllUsers);
router.get('/:id', findUserById);
router.put('/:id', updateUserData);
router.delete('/:id', deleteUserData);

export default router;