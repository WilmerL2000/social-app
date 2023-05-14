import express from 'express';
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getUsersSearch,
} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

/* `const router = express.Router();` is creating a new instance of an Express router. This router can
be used to define routes for handling HTTP requests. */
const router = express.Router();

// READ
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);
router.post('/:id/search', verifyToken, getUsersSearch);

// UPDATE
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;
