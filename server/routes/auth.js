import express from 'express';
import { editProfile, login, register } from '../controllers/auth.js';
import { verifyToken } from '../middleware/auth.js';

/* `const router = express.Router();` is creating a new instance of an Express router. This router can
be used to define routes for handling HTTP requests. */
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.patch('/:id/edit-profile', verifyToken, editProfile);

export default router;
