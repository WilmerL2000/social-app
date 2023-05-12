import express from 'express';
import {
  commentPost,
  getFeedPost,
  getUserPost,
  likePost,
} from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';
/* `const router = express.Router();` is creating a new instance of an Express router. This router can
be used to define routes for handling HTTP requests. */
const router = express.Router();

// READ
router.get('/', verifyToken, getFeedPost);
router.get('/:userId/posts', verifyToken, getUserPost);

// UPDATE
router.patch('/:id/comment', verifyToken, commentPost);
router.patch('/:id/like', verifyToken, likePost);

export default router;
